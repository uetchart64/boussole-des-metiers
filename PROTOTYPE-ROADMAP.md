# Prototype — 01 : La découverte de Camille

**Projet :** Boussole des Métiers · **Scénario :** 01 — La découverte de Camille
**Phase :** 5 — Développement agentique (WDS) · **Construit le :** 2026-06-18
**Type :** Web statique (HTML + Tailwind CDN + JS vanilla), **sans build**, ouvrable en `file://`

---

## Comment l'ouvrir

Double-cliquer sur [`index.html`](index.html) (ou le servir via n'importe quel serveur statique).
Aucune installation, aucune dépendance à builder. **Fonctionne 100 % hors-ligne** : Tailwind est
**vendoré localement** (`js/tailwind-play.js`) et les 30 images sont en place. Aucune connexion requise.

> ⚠️ **Correctif 2026-06-18 :** auparavant, Tailwind était chargé depuis un **CDN** via un `<script>`
> **bloquant** en tête de page. Sans réseau (hors-ligne, wifi capricieux, proxy), ce script stallait
> toute la page → « rien ne se passe au clic, pas d'image » (le JS ne démarrait jamais). Tailwind est
> désormais **local** et les polices sont chargées en **non-bloquant** (repli polices système hors-ligne).

---

## Ce que couvre ce prototype

Le **parcours complet** du scénario 01, en une seule application à 4 vues (SPA) :

| Vue | Spec | Rôle |
|-----|------|------|
| **1.1 Accueil** | [`1.1-accueil.md`](../../../design-artifacts/C-UX-Scenarios/01-la-decouverte-de-camille/1.1-accueil/1.1-accueil.md) | Poser l'esprit (instinct, sans jugement) + lancer |
| **1.2 Jeu de cartes** | [`1.2-jeu-de-cartes.md`](../../../design-artifacts/C-UX-Scenarios/01-la-decouverte-de-camille/1.2-jeu-de-cartes/1.2-jeu-de-cartes.md) | Réagir « ça m'attire / pas pour moi » aux 30 images |
| **1.3 Calcul** | [`1.3-calcul-du-profil.md`](../../../design-artifacts/C-UX-Scenarios/01-la-decouverte-de-camille/1.3-calcul-du-profil/1.3-calcul-du-profil.md) | Temps de bascule doux (~2,2 s) |
| **1.4 Résultat + relance** | [`1.4-resultat-relance.md`](../../../design-artifacts/C-UX-Scenarios/01-la-decouverte-de-camille/1.4-resultat-relance/1.4-resultat-relance.md) | Profil (2-3 univers) + 3-6 métiers + relance |

**Moteur de profil** ([`moteur-profil.feature.md`](../../../design-artifacts/C-UX-Scenarios/01-la-decouverte-de-camille/Features/moteur-profil.feature.md))
implémenté à l'identique : likes only, scores **internes** (jamais affichés), univers dominants → métiers recoupés,
**déterministe**. Composant **mini-carte métier** rendu selon sa spec.

---

## Structure des fichiers

```
01-la-decouverte-de-camille-prototype/
├── index.html              # Les 4 vues + config Tailwind (tokens Akolia) + polices
├── js/
│   ├── tailwind-play.js    # Tailwind Play v3.4.17 VENDORÉ (local → hors-ligne, remplace le CDN)
│   ├── moteur-data.js      # Donnée embarquée (COPIE de design-artifacts/E-Assets/moteur-data/)
│   ├── moteur.js           # Le moteur de profil (logique pure, testable en Node)
│   └── app.js              # Contrôleur : routeur de vues, rendu, clavier, transitions, a11y
├── assets/
│   └── cards/              # 30 .jpg du deck (source Pixabay) — EN PLACE ✅
└── PROTOTYPE-ROADMAP.md    # ce fichier
```

> ⚠️ **`js/moteur-data.js` est une copie.** La **source de vérité** reste
> `design-artifacts/E-Assets/moteur-data/` (les `.json` + le bundle `.js`). Si la donnée change
> (taxonomie, tagage, codes ROME), éditer la source PUIS recopier le bundle ici.

---

## Charte Akolia (autoritaire) — comment elle est appliquée

Tokens de la [charte](../../../design-artifacts/D-Design-System/01-Visual-Design/brand-charter-akolia.md)
câblés dans la config Tailwind (`index.html`) : **couleurs hex inchangées**, **Montserrat** (titres) / **Lato** (corps),
rayons (12/18/20/full), ombres douces teintées, fond crème, motif **eucalyptus** décoratif en coin.

**WCAG 2.1 AA :**
- Couples blanc-sur-aplat valides uniquement (pétrole CTA 7.37 ✓, vert foncé, gris).
- Tout état = **couleur + icône/forme + libellé** (les 2 boutons du jeu portent flèche ←/→ + texte, jamais la couleur seule).
- Clavier complet (←/→ pour trancher, Tab/Entrée), **focus visible** (anneau pétrole), cibles ≥ 44 px.
- `prefers-reduced-motion` respecté (glissement de carte et indicateur désactivés → swap instantané ; la bascule 1.3 reste pilotée par **timer**, jamais par une animation).
- `lang="fr"`, un seul `H1` par vue, hiérarchie de titres, aria-live sur la bascule, `role="progressbar"`.

---

## Images : placeholders pour l'instant

Les **30 `.jpg` ne sont pas encore générés** (Phase 6 a produit les
[prompts](../../../design-artifacts/E-Assets/images/prompts/deck-prompts.md), pas les images).
Le proto **démarre donc sur placeholders** : si une image manque, la carte affiche un **cadre neutre
Akolia** avec la **description de la scène** (le texte `alt`) + la mention « Image à venir ». Le parcours
est ainsi **entièrement testable** dès maintenant.

**Pour passer aux vraies images :** générer les 30 `.jpg` depuis les prompts, les nommer **exactement**
comme les slugs (voir [`images/cards/README.md`](../../../design-artifacts/E-Assets/images/cards/README.md)),
et les déposer dans `assets/cards/`. **Aucune autre modification** : les `image_src` pointent déjà au bon endroit,
les placeholders s'effacent automatiquement.

---

## Décisions de build (defaults posés sur les Open Questions des specs)

Les specs laissaient des questions ouvertes à valider avec Ophélia. Le proto applique le **défaut recommandé**
de chaque spec (modifiable en séance) :

| Sujet | Défaut appliqué | Source |
|-------|-----------------|--------|
| Libellé CTA 1.1 | « C'est parti » (court) + réassurance en note dessous | 1.1 OQ#1 (reco spec) |
| Logo Akolia en tête | Non (kicker texte seulement) — à ajouter si Ophélia le souhaite | 1.1 OQ#2 |
| Légende visible des cartes 1.2 | Aucune (instinct pur) ; `alt` complet conservé | 1.2 OQ#2 (reco spec) |
| Retour arrière 1.2 | Aucun (binaire pur) | Décision Phase 4 |
| Police message 1.3 | **Lato** (doux) | 1.3 OQ#1 (reco spec) |
| Durée bascule 1.3 | `CALCUL_DURATION_MS = 2200 ms` (réglable) | feature / 1.3 OQ#2 |
| Nombre d'univers 1.4 | 2 à 3 selon les likes (top dimensions à score > 0, cap 3) | 1.4 OQ#1 |
| Chip univers sur mini-carte | Affichée (univers dominant du métier) | composant OQ#1 |
| Liens Metierscope | Pattern France Travail (déjà dans la donnée) ; état « Fiche bientôt disponible » si `null` | composant OQ#2 |

> Ces points restent **à valider avec Ophélia** — ils sont faciles à régler dans `index.html` / `moteur-data.js`.

---

## Vérification du moteur (déterminisme)

Le moteur est testable hors navigateur. Exemple déroulé (cf. `00-moteur-data.md` §4) — likes :
`img-01, img-19, img-04, img-20, img-13` :

- **Univers du profil :** `concret-matiere`, `creation-idees`, `nature-plein-air` (3 univers).
- **Métiers (6) :** Ébéniste · Maraîcher.ère · Céramiste · Cuisinier.ère · Plombier.ère · Photographe. _(Boulanger.ère et Jardinier.ère sont **exclus** : leurs images — boulangerie, paysagisme — ont été rejetées → **suppression directe**, PE 2026-06-18.)_
- **Déterministe** ✅ (mêmes likes ⇒ même résultat, quel que soit l'ordre de saisie).
- Cas limites vérifiés : 0 like → message doux « Recommencer » ; 1 like → ≥ 3 métiers ; tout liké → 3 univers / 6 métiers (caps).

> Les **scores restent internes** : le décompte n'est jamais affiché (pas de score → pas de verdict).

---

## Robustesse hors-ligne ✅ (corrigé 2026-06-18)

Tailwind est désormais **vendoré localement** (`js/tailwind-play.js`) : le proto se style et fonctionne
**sans aucun réseau**, par double-clic. Les polices (Montserrat/Lato) sont chargées en **non-bloquant**
depuis Google Fonts — présentes en ligne, repli automatique sur les polices système hors-ligne (la mise
en page et les couleurs Akolia restent identiques).

> **Polish optionnel** (fidélité de marque hors-ligne à 100 %) : **vendorer aussi les polices**
> (télécharger les `.woff2` Montserrat/Lato dans `assets/fonts/` + un petit `@font-face` local), pour
> retrouver exactement la typo Akolia même sans connexion. Non bloquant.

---

## Reste à faire (hors prototype)

- Générer et déposer les **30 `.jpg`** (depuis les prompts Phase 6).
- **Valider la donnée avec Ophélia** : taxonomie, tagage des images, **codes ROME** (1 par 1), couverture Metierscope (OQ-1 → OQ-6).
- Trancher les Open Questions ci-dessus en séance, sur le proto.

---

_Créé avec la méthode Whiteport Design Studio (WDS) — Phase 5._
