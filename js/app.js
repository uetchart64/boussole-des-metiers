/*
 * Boussole des Métiers — Contrôleur du prototype (SPA statique)
 * ------------------------------------------------------------
 * Pilote les 4 vues du scénario 01 (Accueil → Jeu de cartes → Calcul → Résultat),
 * branche le moteur de profil (js/moteur.js) sur la donnée (js/moteur-data.js),
 * et porte l'accessibilité (clavier ←/→, focus, reduced-motion, placeholders d'images).
 *
 * État en mémoire uniquement — rien n'est enregistré (ni localStorage, ni réseau).
 */
(function () {
  'use strict';

  var VUES = {
    accueil:  'view-accueil',
    cartes:   'view-cartes',
    calcul:   'view-calcul',
    resultat: 'view-resultat'
  };

  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  function reducedMotion() { return mq.matches; }

  var etat, cfg;
  var vueCourante = null;
  var verrou = false;          // anti double-clic / appui maintenu (debounce de réaction)
  var timerCalcul = null;

  // Réfs DOM (remplies à l'init)
  var imgEl, placeholderEl, placeholderTextEl, progressEl, progressFillEl, progressLabelEl;

  // ---- Décor eucalyptus (injecté, purement décoratif) ----
  var EUCALYPTUS_SVG =
    '<svg width="210" height="190" viewBox="0 0 210 190" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:.82">' +
      '<g stroke="#A2856F" stroke-width="2.2" stroke-linecap="round" fill="none">' +
        '<path d="M204 8 C168 34 150 64 138 150"/>' +
        '<path d="M170 40 C188 52 196 74 190 96"/>' +
        '<path d="M152 78 C168 90 174 110 168 130"/>' +
      '</g>' +
      '<g fill="#8DA694">' +
        '<ellipse cx="186" cy="30" rx="14" ry="7.5" transform="rotate(-32 186 30)"/>' +
        '<ellipse cx="160" cy="52" rx="14" ry="7.5" transform="rotate(-22 160 52)"/>' +
        '<ellipse cx="146" cy="84" rx="13" ry="7"  transform="rotate(-12 146 84)"/>' +
        '<ellipse cx="140" cy="118" rx="12" ry="6.5" transform="rotate(-4 140 118)"/>' +
        '<ellipse cx="202" cy="56" rx="13" ry="7"  transform="rotate(40 202 56)"/>' +
        '<ellipse cx="192" cy="86" rx="12" ry="6.5" transform="rotate(34 192 86)"/>' +
        '<ellipse cx="176" cy="116" rx="12" ry="6.5" transform="rotate(28 176 116)"/>' +
        '<ellipse cx="135" cy="146" rx="11" ry="6"  transform="rotate(6 135 146)"/>' +
      '</g>' +
    '</svg>';

  function injecterEucalyptus() {
    var noeuds = document.querySelectorAll('[data-eucalyptus]');
    for (var i = 0; i < noeuds.length; i++) noeuds[i].innerHTML = EUCALYPTUS_SVG;
  }

  // ---- Routeur de vues ----
  function montrerVue(nom) {
    Object.keys(VUES).forEach(function (k) {
      var el = document.getElementById(VUES[k]);
      el.hidden = true;
      el.classList.remove('view-fade');
    });
    var actif = document.getElementById(VUES[nom]);
    actif.hidden = false;
    if (!reducedMotion()) { void actif.offsetWidth; actif.classList.add('view-fade'); }
    vueCourante = nom;
    window.scrollTo(0, 0);

    // Résultat gère son propre focus (titre) ; ailleurs, on pose le focus sur le H1 de la vue.
    if (nom !== 'resultat') {
      var h1 = actif.querySelector('h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    }
  }

  // ============================================================
  // 1.2 — Jeu de cartes
  // ============================================================
  function chargerImage(carte) {
    placeholderEl.hidden = true;
    imgEl.hidden = false;
    imgEl.alt = carte.alt;
    imgEl.onerror = function () { montrerPlaceholder(carte); };
    imgEl.src = carte.image_src;
  }

  function montrerPlaceholder(carte) {
    imgEl.onerror = null;
    imgEl.hidden = true;
    placeholderTextEl.textContent = carte.alt;
    placeholderEl.hidden = false;
  }

  function majProgress() {
    var n = etat.index + 1;                      // numéro de la carte courante (1-based)
    var total = etat.deck.length;
    progressLabelEl.textContent = 'Carte ' + n + ' / ' + total;
    progressEl.setAttribute('aria-valuenow', String(n));
    progressEl.setAttribute('aria-label', 'Progression : carte ' + n + ' sur ' + total);
    progressFillEl.style.width = ((n / total) * 100) + '%';
  }

  function rendreCarte(animIn) {
    var carte = window.Moteur.carteCourante(etat);
    if (!carte) return;
    imgEl.classList.remove('card-exit-left', 'card-exit-right');
    chargerImage(carte);
    majProgress();
    if (animIn && !reducedMotion()) {
      imgEl.classList.add('card-enter');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { imgEl.classList.remove('card-enter'); });
      });
    }
  }

  function prechargerSuivante() {
    var s = window.Moteur.carteSuivante(etat);
    if (s) { var im = new Image(); im.src = s.image_src; }
  }

  function reagir(choix) {
    if (verrou || vueCourante !== 'cartes' || window.Moteur.estFini(etat)) return;
    verrou = true;

    var res = window.Moteur.reagir(etat, choix);  // index++ ; calcule si fin de paquet
    var exitClass = choix === 'like' ? 'card-exit-right' : 'card-exit-left';
    imgEl.classList.add(exitClass);

    var delai = reducedMotion() ? 0 : 180;
    setTimeout(function () {
      imgEl.classList.remove(exitClass);
      if (res.fini) {
        allerCalcul();
      } else {
        rendreCarte(true);
        prechargerSuivante();
      }
      verrou = false;
    }, delai);
  }

  function demarrerJeu() {
    window.Moteur.reinitialiser(etat);            // départ propre (couvre « Recommencer »)
    verrou = false;
    montrerVue('cartes');
    rendreCarte(false);
    prechargerSuivante();
  }

  // ============================================================
  // 1.3 — Calcul (transition pilotée par timer, robuste reduced-motion)
  // ============================================================
  function allerCalcul() {
    montrerVue('calcul');
    clearTimeout(timerCalcul);
    timerCalcul = setTimeout(allerResultat, cfg.CALCUL_DURATION_MS);
  }

  // ============================================================
  // 1.4 — Résultat + relance
  // ============================================================
  function el(tag, className, texte) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (texte != null) n.textContent = texte;
    return n;
  }

  function carteUnivers(u) {
    var carte = el('div', 'bg-card border border-hairline rounded-sm shadow-sm p-6 flex flex-col gap-2');
    var icone = el('span', 'text-[24px] leading-none');
    icone.setAttribute('aria-hidden', 'true');
    icone.textContent = u.icone;
    carte.appendChild(icone);
    carte.appendChild(el('h3', 't-h3', u.nom));
    carte.appendChild(el('p', 't-body', u.phrase));
    return carte;
  }

  function carteMetier(m) {
    var carte = el('article', 'bg-card border border-hairline rounded-sm shadow-sm p-6 flex flex-col gap-2 transition hover:shadow hover:border-primary');

    var chip = window.Moteur.universChip(etat, m);
    if (chip) {
      carte.appendChild(el('span', 't-kicker text-text-green self-start', chip.nom));
    }

    carte.appendChild(el('h3', 't-h3', m.titre));
    carte.appendChild(el('p', 't-body', m.ligne));

    if (m.metierscope_url) {
      var a = el('a', 'font-body font-bold text-[15px] text-accent inline-flex items-center gap-1 min-h-[44px] mt-1');
      a.href = m.metierscope_url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', 'Découvrir ' + m.titre + ' sur Metierscope (ouvre un nouvel onglet)');
      a.appendChild(document.createTextNode('Découvrir sur Metierscope '));
      var fleche = el('span', null, '↗');
      fleche.setAttribute('aria-hidden', 'true');
      a.appendChild(fleche);
      carte.appendChild(a);
    } else {
      carte.appendChild(el('span', 't-body text-text-earth italic mt-1', 'Fiche bientôt disponible'));
    }
    return carte;
  }

  function rendreResultat() {
    var contentEl = document.getElementById('resultat-content');
    var emptyEl = document.getElementById('resultat-empty');
    var profil = etat.universProfil || [];
    var metiers = etat.metiers || [];
    var vide = profil.length === 0 || etat.likes.length === 0;

    contentEl.hidden = vide;
    emptyEl.hidden = !vide;
    if (vide) return;

    var universGrid = document.getElementById('univers-grid');
    var metiersGrid = document.getElementById('metiers-grid');
    universGrid.innerHTML = '';
    metiersGrid.innerHTML = '';

    profil.forEach(function (id) {
      var u = window.Moteur.universParId(etat, id);
      if (u) universGrid.appendChild(carteUnivers(u));
    });
    metiers.forEach(function (m) { metiersGrid.appendChild(carteMetier(m)); });
  }

  function allerResultat() {
    rendreResultat();
    montrerVue('resultat');
    var titre = document.getElementById('resultat-titre');
    if (titre) titre.focus({ preventScroll: true });
  }

  function recommencer() {
    window.Moteur.reinitialiser(etat);
    montrerVue('accueil');
  }

  // ============================================================
  // Init
  // ============================================================
  function init() {
    if (!window.BOUSSOLE_DATA || !window.Moteur) {
      console.error('Boussole : données ou moteur manquants.');
      return;
    }
    etat = window.Moteur.creerEtat(window.BOUSSOLE_DATA);
    cfg = etat.config;

    // Réfs DOM (jeu de cartes)
    imgEl = document.getElementById('card-image');
    placeholderEl = document.getElementById('card-placeholder');
    placeholderTextEl = document.getElementById('card-placeholder-text');
    progressEl = document.getElementById('progress');
    progressFillEl = document.getElementById('progress-fill');
    progressLabelEl = document.getElementById('progress-label');
    progressEl.setAttribute('aria-valuemax', String(etat.deck.length));

    injecterEucalyptus();

    document.getElementById('btn-lancer').addEventListener('click', demarrerJeu);
    document.getElementById('btn-attirer').addEventListener('click', function () { reagir('like'); });
    document.getElementById('btn-rejeter').addEventListener('click', function () { reagir('rejet'); });
    document.getElementById('btn-recommencer').addEventListener('click', recommencer);

    // Clavier ←/→ (actif uniquement sur le jeu de cartes)
    document.addEventListener('keydown', function (e) {
      if (vueCourante !== 'cartes') return;
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();          // évite le défilement de page sur ←/→
      if (e.repeat) return;        // ignore l'auto-répétition (flèche maintenue) : une réaction = un appui
      if (e.key === 'ArrowRight') reagir('like');
      else reagir('rejet');
    });

    montrerVue('accueil');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
