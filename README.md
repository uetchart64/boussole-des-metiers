# Boussole des Métiers — Prototype

**Scénario 01 — « La découverte de Camille »**

Un **jeu de cartes visuel** pour explorer les métiers **à l'instinct**, utilisé à deux en séance
(accompagnement à la réorientation / bilan de compétences). On réagit « ça m'attire / pas pour moi »
à une trentaine d'images de métiers, puis l'outil propose un **profil d'intérêts** (2-3 univers, sans
score ni jugement) et **3 à 6 métiers à explorer** (liens MétierScope). C'est un **support de
discussion**, jamais un verdict.

## Lancer en local

Double-cliquer sur **`index.html`**. Aucune installation, **fonctionne hors-ligne** (Tailwind est
vendoré localement, les 30 images sont incluses).

## Hébergement (GitHub Pages)

Site **100 % statique** (HTML + JavaScript vanilla + Tailwind local + images) avec `index.html` à la
racine → servi tel quel par GitHub Pages, sans build ni backend. **Rien n'est enregistré** (aucune
donnée personnelle, pas de stockage, pas d'analytics).

## Structure

```
├── index.html              # Les 4 vues (Accueil → Jeu de cartes → Calcul → Résultat)
├── js/
│   ├── tailwind-play.js    # Tailwind Play v3.4.17 vendoré (hors-ligne)
│   ├── moteur-data.js      # Donnée embarquée (6 univers · 30 cartes · 32 métiers ROME)
│   ├── moteur.js           # Moteur de profil (logique pure, déterministe)
│   └── app.js              # Contrôleur (routeur de vues, rendu, clavier, a11y)
└── assets/cards/           # 30 photos du jeu de cartes (+ CREDITS.md)
```

## Accessibilité

Conçu **WCAG 2.1 AA** : navigation clavier (←/→), focus visible, cibles ≥ 44 px, contrastes AA,
`prefers-reduced-motion`, hiérarchie de titres, liens externes annoncés.

## Crédits images

Photos **Pixabay** (banque libre, usage commercial autorisé) — détail dans
[`assets/cards/CREDITS.md`](assets/cards/CREDITS.md).

## Charte

Identité visuelle **Akolia** (couleurs + polices Montserrat / Lato).

---

_Conçu avec la méthode **Whiteport Design Studio (WDS)**._
