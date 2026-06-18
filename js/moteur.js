/*
 * Boussole des Métiers — Moteur de profil
 * ---------------------------------------
 * Implémente `moteur-profil.feature.md` :
 *   - likes only (COUNT_REJECTS = false) ; les scores sont INTERNES, jamais affichés ;
 *   - univers du profil = dimensions à score > 0, triées desc, tie-break = ordre de la
 *     taxonomie, jusqu'à MAX_UNIVERS (1 à 3 selon les dimensions positives) ;
 *   - métiers = recoupement (univers profil ↔ univers métier), classés par nombre de
 *     recoupements puis ordre du catalogue ; on élargit si < MIN, on tronque si > MAX.
 *   - aucune persistance — tout vit en mémoire (« rien n'est enregistré »).
 *
 * Déterministe : mêmes likes ⇒ même résultat (tris stables + tie-break par taxonomie).
 *
 * Compatible navigateur (window.Moteur) ET Node (module.exports) pour les tests.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();          // Node (vérification déterminisme)
  } else {
    root.Moteur = factory();             // Navigateur (proto statique)
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /** Crée l'état runtime à partir du bundle de données (window.BOUSSOLE_DATA). */
  function creerEtat(data) {
    return {
      config: data.config,
      taxonomie: data.taxonomie,
      catalogueMetiers: data.metiers,
      deck: data.deck.slice(),     // ordre fixe (proto v1)
      index: 0,
      likes: [],
      rejets: [],
      // dérivés (remplis par calculer(), en fin de paquet) :
      scores: null,                // INTERNE — jamais affiché
      universProfil: null,
      metiers: null,
      metiersSupprimes: null       // INTERNE — métiers retirés car leur image a été rejetée
    };
  }

  /** « Recommencer » — purge tout l'état runtime. */
  function reinitialiser(etat) {
    etat.index = 0;
    etat.likes = [];
    etat.rejets = [];
    etat.scores = null;
    etat.universProfil = null;
    etat.metiers = null;
    etat.metiersSupprimes = null;
    return etat;
  }

  function carteCourante(etat) {
    return etat.deck[etat.index] || null;
  }

  function carteSuivante(etat) {
    return etat.deck[etat.index + 1] || null;
  }

  function estDerniereCarte(etat) {
    return etat.index === etat.deck.length - 1;
  }

  function estFini(etat) {
    return etat.index >= etat.deck.length;
  }

  /**
   * Enregistre une réaction sur la carte courante puis avance l'index.
   * @param choix "like" (ça m'attire) | "rejet" (pas pour moi)
   * @returns { carte, choix, fini }
   */
  function reagir(etat, choix) {
    if (estFini(etat)) return { carte: null, choix: choix, fini: true };
    var carte = etat.deck[etat.index];
    if (choix === 'like') etat.likes.push(carte.id);
    else etat.rejets.push(carte.id);
    etat.index += 1;
    var fini = estFini(etat);
    if (fini) calculer(etat);     // calcul instantané en fin de paquet (le délai visible est en 1.3)
    return { carte: carte, choix: choix, fini: fini };
  }

  /** Décompte interne + univers du profil + métiers. */
  function calculer(etat) {
    var cfg = etat.config;
    var taxo = etat.taxonomie;

    var ordreUnivers = {};
    taxo.forEach(function (u) { ordreUnivers[u.id] = u.ordre; });

    // 1) Décompte interne (likes only sauf COUNT_REJECTS).
    var scores = {};
    taxo.forEach(function (u) { scores[u.id] = 0; });

    var deckParId = {};
    etat.deck.forEach(function (c) { deckParId[c.id] = c; });

    etat.likes.forEach(function (id) {
      var carte = deckParId[id];
      if (!carte) return;
      carte.dimensions.forEach(function (dim) {
        if (scores[dim] != null) scores[dim] += 1;
      });
    });

    if (cfg.COUNT_REJECTS) {              // non utilisé en MVP — les rejets retireraient du poids
      etat.rejets.forEach(function (id) {
        var carte = deckParId[id];
        if (!carte) return;
        carte.dimensions.forEach(function (dim) {
          if (scores[dim] != null) scores[dim] -= 1;
        });
      });
    }
    etat.scores = scores;                 // INTERNE — jamais rendu à l'écran

    // Suppression directe : un métier directement représenté par une image REJETÉE est
    // retiré des suggestions (retour séance Ophélia 2026-06-18 : cohérence perçue —
    // « j'ai dit non à la boulangère, ne me propose pas boulanger »).
    var metiersSupprimes = {};
    etat.rejets.forEach(function (id) {
      var carte = deckParId[id];
      if (carte && carte.metier_lie) metiersSupprimes[carte.metier_lie] = true;
    });
    etat.metiersSupprimes = metiersSupprimes;

    // 2) Classement complet des dimensions : score desc, tie-break = ordre taxonomie.
    var classement = taxo.map(function (u) { return u.id; }).sort(function (a, b) {
      if (scores[b] !== scores[a]) return scores[b] - scores[a];
      return ordreUnivers[a] - ordreUnivers[b];
    });

    var positifs = classement.filter(function (id) { return scores[id] > 0; });
    etat.universProfil = positifs.slice(0, cfg.MAX_UNIVERS);   // 1 à MAX_UNIVERS (pas de plancher imposé ; nb exact = OQ Ophélia, cf. 1.4 §313)

    // 3) Métiers recoupés (en retirant les métiers supprimés par rejet direct).
    etat.metiers = selectionnerMetiers(etat, classement, etat.universProfil, metiersSupprimes);
    return etat;
  }

  function nbRecoupements(metier, universSet) {
    var n = 0;
    metier.univers.forEach(function (u) { if (universSet[u]) n += 1; });
    return n;
  }

  function selectionnerMetiers(etat, classement, universProfil, supprimes) {
    var cfg = etat.config;
    var catalogue = etat.catalogueMetiers;
    supprimes = supprimes || {};

    function selectionPour(universListe) {
      var universSet = {};
      universListe.forEach(function (u) { universSet[u] = true; });
      var retenus = [];
      catalogue.forEach(function (m, idx) {
        if (supprimes[m.code_rome]) return;        // suppression directe (image rejetée)
        var n = nbRecoupements(m, universSet);
        if (n > 0) retenus.push({ metier: m, recoupements: n, ordre: idx });
      });
      retenus.sort(function (a, b) {
        if (b.recoupements !== a.recoupements) return b.recoupements - a.recoupements;
        return a.ordre - b.ordre;        // tie-break stable = ordre catalogue
      });
      return retenus.map(function (r) { return r.metier; });
    }

    if (universProfil.length === 0) return [];   // 0 like → profil vide (cas limite géré en 1.4)

    var universElargi = universProfil.slice();
    var selection = selectionPour(universElargi);

    // Élargir à la dimension suivante du classement jusqu'à atteindre MIN_METIERS.
    var i = universElargi.length;
    while (selection.length < cfg.MIN_METIERS && i < classement.length) {
      universElargi.push(classement[i]);
      selection = selectionPour(universElargi);
      i += 1;
    }

    return selection.slice(0, cfg.MAX_METIERS);  // tronquer à MAX (les mieux recoupés)
  }

  /** Univers (objet taxonomie) par id, pour l'affichage. */
  function universParId(etat, id) {
    for (var i = 0; i < etat.taxonomie.length; i++) {
      if (etat.taxonomie[i].id === id) return etat.taxonomie[i];
    }
    return null;
  }

  /** Chip de la mini-carte = univers dominant du métier (univers[0], cf. moteur-data.js). */
  function universChip(etat, metier) {
    return universParId(etat, metier.univers[0]);
  }

  return {
    creerEtat: creerEtat,
    reinitialiser: reinitialiser,
    carteCourante: carteCourante,
    carteSuivante: carteSuivante,
    estDerniereCarte: estDerniereCarte,
    estFini: estFini,
    reagir: reagir,
    calculer: calculer,
    universParId: universParId,
    universChip: universChip
  };
});
