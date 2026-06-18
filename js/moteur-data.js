/*
 * Boussole des Métiers — Données du moteur de profil (bundle prototype)
 * -------------------------------------------------------------------
 * ⚠ FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.
 * Source de vérité : les .json voisins (taxonomie-univers, deck-images, catalogue-metiers).
 * Régénérer : node build-bundle.js (depuis design-artifacts/E-Assets/moteur-data/).
 * Usage proto : <script src="moteur-data.js"></script> -> window.BOUSSOLE_DATA
 */
window.BOUSSOLE_DATA = {
  "config": {
    "DECK_SIZE": 30,
    "MAX_UNIVERS": 3,
    "MIN_METIERS": 3,
    "MAX_METIERS": 6,
    "CALCUL_DURATION_MS": 2200,
    "COUNT_REJECTS": false
  },
  "taxonomie": [
    {
      "id": "concret-matiere",
      "ordre": 1,
      "nom": "Le concret et la matière",
      "phrase": "Vous êtes attiré.e par ce qu'on touche, ce qu'on fabrique de ses mains.",
      "icone": "🔧"
    },
    {
      "id": "contact-aide",
      "ordre": 2,
      "nom": "Le contact et l'aide",
      "phrase": "Être avec les autres, les accompagner, transmettre : ça vous parle.",
      "icone": "🤝"
    },
    {
      "id": "nature-plein-air",
      "ordre": 3,
      "nom": "La nature et le plein air",
      "phrase": "Le dehors, le vivant, le mouvement vous attirent plus qu'un bureau.",
      "icone": "🌿"
    },
    {
      "id": "creation-idees",
      "ordre": 4,
      "nom": "La création et les idées",
      "phrase": "Imaginer, concevoir, donner forme : vous aimez créer.",
      "icone": "🎨"
    },
    {
      "id": "organisation-rigueur",
      "ordre": 5,
      "nom": "L'organisation et la rigueur",
      "phrase": "Mettre de l'ordre, suivre, fiabiliser : le cadre vous rassure et vous motive.",
      "icone": "🗂️"
    },
    {
      "id": "mouvement-action",
      "ordre": 6,
      "nom": "Le mouvement et l'action",
      "phrase": "Bouger, intervenir, voir le résultat tout de suite : l'action vous porte.",
      "icone": "⚡"
    }
  ],
  "deck": [
    {
      "id": "img-01",
      "image_src": "assets/cards/atelier-bois.jpg",
      "alt": "Un atelier de menuiserie : établi en bois, copeaux frais et outils à main posés à portée.",
      "dimensions": [
        "concret-matiere",
        "creation-idees"
      ],
      "metier_lie": "B1802"
    },
    {
      "id": "img-02",
      "image_src": "assets/cards/garage-auto.jpg",
      "alt": "Un garage automobile : capot ouvert sur un moteur, clés et outils de mécanique alignés.",
      "dimensions": [
        "concret-matiere",
        "mouvement-action"
      ],
      "metier_lie": "I1604"
    },
    {
      "id": "img-03",
      "image_src": "assets/cards/chantier-maconnerie.jpg",
      "alt": "Un chantier de maçonnerie : un mur de parpaings en cours, truelle et seau de mortier.",
      "dimensions": [
        "concret-matiere",
        "mouvement-action"
      ],
      "metier_lie": "F1703"
    },
    {
      "id": "img-04",
      "image_src": "assets/cards/atelier-couture.jpg",
      "alt": "Un atelier de couture : machine à coudre, coupons de tissu et mètre ruban sur la table.",
      "dimensions": [
        "concret-matiere",
        "creation-idees"
      ],
      "metier_lie": null
    },
    {
      "id": "img-05",
      "image_src": "assets/cards/soudure-metal.jpg",
      "alt": "Un atelier de métallerie : gerbe d'étincelles sous le poste à souder, structure métallique.",
      "dimensions": [
        "concret-matiere"
      ],
      "metier_lie": "H2913"
    },
    {
      "id": "img-06",
      "image_src": "assets/cards/boulangerie.jpg",
      "alt": "Un fournil de boulangerie : pâtons en attente, farine sur le plan de travail et four chaud.",
      "dimensions": [
        "concret-matiere",
        "creation-idees"
      ],
      "metier_lie": "D1102"
    },
    {
      "id": "img-07",
      "image_src": "assets/cards/salle-classe.jpg",
      "alt": "Une salle de classe : tableau écrit, pupitres alignés et lumière du matin par la fenêtre.",
      "dimensions": [
        "contact-aide",
        "creation-idees"
      ],
      "metier_lie": null
    },
    {
      "id": "img-08",
      "image_src": "assets/cards/soin-infirmier.jpg",
      "alt": "Un cabinet de soins : des mains qui préparent un pansement, blouse et matériel médical propre.",
      "dimensions": [
        "contact-aide"
      ],
      "metier_lie": "J1506"
    },
    {
      "id": "img-09",
      "image_src": "assets/cards/accueil-reception.jpg",
      "alt": "Un comptoir d'accueil : badge, écran d'information et fauteuils d'attente accueillants.",
      "dimensions": [
        "contact-aide",
        "organisation-rigueur"
      ],
      "metier_lie": null
    },
    {
      "id": "img-10",
      "image_src": "assets/cards/aide-domicile.jpg",
      "alt": "Un salon chez un particulier : une tasse de thé tendue, ambiance d'accompagnement à domicile.",
      "dimensions": [
        "contact-aide"
      ],
      "metier_lie": "K1302"
    },
    {
      "id": "img-11",
      "image_src": "assets/cards/anim-plein-air.jpg",
      "alt": "Une activité de plein air encadrée : ballons et cônes sur l'herbe, jeux collectifs en extérieur.",
      "dimensions": [
        "contact-aide",
        "nature-plein-air"
      ],
      "metier_lie": "K1206"
    },
    {
      "id": "img-12",
      "image_src": "assets/cards/coiffure.jpg",
      "alt": "Un salon de coiffure : fauteuil, miroir, ciseaux et peignes posés sur la tablette.",
      "dimensions": [
        "contact-aide",
        "creation-idees"
      ],
      "metier_lie": "D1202"
    },
    {
      "id": "img-13",
      "image_src": "assets/cards/maraichage.jpg",
      "alt": "Un potager maraîcher : rangées de légumes, des mains qui récoltent dans la terre meuble.",
      "dimensions": [
        "nature-plein-air",
        "concret-matiere"
      ],
      "metier_lie": "A1414"
    },
    {
      "id": "img-14",
      "image_src": "assets/cards/foret-elagage.jpg",
      "alt": "Une forêt en exploitation : tronc fraîchement coupé, cordes et casque d'élagueur.",
      "dimensions": [
        "nature-plein-air",
        "mouvement-action"
      ],
      "metier_lie": "A1201"
    },
    {
      "id": "img-15",
      "image_src": "assets/cards/ferme-animaux.jpg",
      "alt": "Une ferme d'élevage : brebis dans un pré, seau de fourrage et clôture en bois.",
      "dimensions": [
        "nature-plein-air",
        "contact-aide"
      ],
      "metier_lie": "A1416"
    },
    {
      "id": "img-16",
      "image_src": "assets/cards/paysagisme.jpg",
      "alt": "Un jardin en création : massifs plantés, brouette d'outils et allée fraîchement tracée.",
      "dimensions": [
        "nature-plein-air",
        "creation-idees"
      ],
      "metier_lie": "A1203"
    },
    {
      "id": "img-17",
      "image_src": "assets/cards/ostreiculture.jpg",
      "alt": "Un parc à huîtres à marée basse : poches ostréicoles sur tables, barque et cirés.",
      "dimensions": [
        "nature-plein-air",
        "mouvement-action"
      ],
      "metier_lie": "A1404"
    },
    {
      "id": "img-18",
      "image_src": "assets/cards/design-graphique.jpg",
      "alt": "Un poste de création graphique : tablette à stylet, nuancier de couleurs et croquis.",
      "dimensions": [
        "creation-idees",
        "organisation-rigueur"
      ],
      "metier_lie": "E1205"
    },
    {
      "id": "img-19",
      "image_src": "assets/cards/poterie.jpg",
      "alt": "Un atelier de poterie : tour en rotation, argile sous les mains, pièces en train de sécher.",
      "dimensions": [
        "creation-idees",
        "concret-matiere"
      ],
      "metier_lie": "B1201"
    },
    {
      "id": "img-20",
      "image_src": "assets/cards/cuisine-chef.jpg",
      "alt": "Une cuisine de restaurant : dressage minutieux d'une assiette, herbes fraîches et pince fine.",
      "dimensions": [
        "creation-idees",
        "concret-matiere"
      ],
      "metier_lie": "G1602"
    },
    {
      "id": "img-21",
      "image_src": "assets/cards/architecte-maquette.jpg",
      "alt": "Un atelier d'architecture : maquette en carton, plans déroulés et règle graduée.",
      "dimensions": [
        "creation-idees",
        "organisation-rigueur"
      ],
      "metier_lie": "F1101"
    },
    {
      "id": "img-22",
      "image_src": "assets/cards/studio-musique.jpg",
      "alt": "Un studio de musique : guitare, micro et table de mixage sous une lumière tamisée.",
      "dimensions": [
        "creation-idees"
      ],
      "metier_lie": "L1202"
    },
    {
      "id": "img-23",
      "image_src": "assets/cards/bureau-gestion.jpg",
      "alt": "Un bureau de gestion : tableaux chiffrés à l'écran, agenda ouvert et tasse de café.",
      "dimensions": [
        "organisation-rigueur"
      ],
      "metier_lie": "M1203"
    },
    {
      "id": "img-24",
      "image_src": "assets/cards/laboratoire.jpg",
      "alt": "Un laboratoire d'analyses : pipette au-dessus de tubes étiquetés, paillasse impeccable.",
      "dimensions": [
        "organisation-rigueur",
        "concret-matiere"
      ],
      "metier_lie": "J1302"
    },
    {
      "id": "img-25",
      "image_src": "assets/cards/entrepot-logistique.jpg",
      "alt": "Un entrepôt logistique : rayonnages de cartons, transpalette et étiquettes de colis.",
      "dimensions": [
        "organisation-rigueur",
        "mouvement-action"
      ],
      "metier_lie": "N1103"
    },
    {
      "id": "img-26",
      "image_src": "assets/cards/pharmacie.jpg",
      "alt": "Une officine de pharmacie : tiroirs de médicaments, ordonnance et comptoir soigné.",
      "dimensions": [
        "organisation-rigueur",
        "contact-aide"
      ],
      "metier_lie": "J1307"
    },
    {
      "id": "img-27",
      "image_src": "assets/cards/pompier-intervention.jpg",
      "alt": "Une intervention de pompiers : lance à incendie déployée, casque et veste haute visibilité.",
      "dimensions": [
        "mouvement-action",
        "contact-aide"
      ],
      "metier_lie": "K1705"
    },
    {
      "id": "img-28",
      "image_src": "assets/cards/livraison-velo.jpg",
      "alt": "Une livraison à vélo en ville : sacoche sur le porte-bagages, rue animée en arrière-plan.",
      "dimensions": [
        "mouvement-action"
      ],
      "metier_lie": "N4105"
    },
    {
      "id": "img-29",
      "image_src": "assets/cards/coach-sportif.jpg",
      "alt": "Une salle de sport : haltères alignés, tapis et plots d'entraînement prêts à l'emploi.",
      "dimensions": [
        "mouvement-action",
        "contact-aide"
      ],
      "metier_lie": "G1204"
    },
    {
      "id": "img-30",
      "image_src": "assets/cards/secours-ambulance.jpg",
      "alt": "Un véhicule de secours : portes arrière ouvertes, brancard et matériel d'urgence prêt.",
      "dimensions": [
        "mouvement-action",
        "contact-aide"
      ],
      "metier_lie": "J1305"
    }
  ],
  "metiers": [
    {
      "code_rome": "B1802",
      "titre": "Ébéniste",
      "ligne": "Fabriquer et restaurer des meubles et objets en bois.",
      "univers": [
        "concret-matiere",
        "creation-idees"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/B1802/"
    },
    {
      "code_rome": "I1604",
      "titre": "Mécanicien.ne automobile",
      "ligne": "Diagnostiquer et réparer les véhicules au quotidien.",
      "univers": [
        "concret-matiere",
        "mouvement-action"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/I1604/"
    },
    {
      "code_rome": "F1703",
      "titre": "Maçon.ne",
      "ligne": "Bâtir murs, fondations et structures sur le chantier.",
      "univers": [
        "concret-matiere",
        "mouvement-action"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/F1703/"
    },
    {
      "code_rome": "D1102",
      "titre": "Boulanger.ère",
      "ligne": "Pétrir, façonner et cuire pains et viennoiseries.",
      "univers": [
        "concret-matiere",
        "creation-idees"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/D1102/"
    },
    {
      "code_rome": "H2913",
      "titre": "Soudeur.euse",
      "ligne": "Assembler des pièces métalliques à la chaleur et à l'arc.",
      "univers": [
        "concret-matiere"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/H2913/"
    },
    {
      "code_rome": "F1603",
      "titre": "Plombier.ère chauffagiste",
      "ligne": "Installer et dépanner eau, sanitaires et chauffage.",
      "univers": [
        "concret-matiere"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/F1603/"
    },
    {
      "code_rome": "J1501",
      "titre": "Aide-soignant.e",
      "ligne": "Accompagner les patients dans les soins et le confort.",
      "univers": [
        "contact-aide"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/J1501/"
    },
    {
      "code_rome": "J1506",
      "titre": "Infirmier.ère",
      "ligne": "Prodiguer les soins et veiller au suivi des patients.",
      "univers": [
        "contact-aide",
        "organisation-rigueur"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/J1506/"
    },
    {
      "code_rome": "K1302",
      "titre": "Auxiliaire de vie / Aide à domicile",
      "ligne": "Aider les personnes au quotidien, à domicile, avec attention.",
      "univers": [
        "contact-aide"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/K1302/"
    },
    {
      "code_rome": "K1206",
      "titre": "Animateur.rice socioculturel.le",
      "ligne": "Imaginer et encadrer des activités pour un groupe.",
      "univers": [
        "contact-aide",
        "mouvement-action"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/K1206/"
    },
    {
      "code_rome": "K1801",
      "titre": "Conseiller.ère en insertion professionnelle",
      "ligne": "Accompagner chacun vers l'emploi et un projet qui lui ressemble.",
      "univers": [
        "contact-aide",
        "organisation-rigueur"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/K1801/"
    },
    {
      "code_rome": "D1202",
      "titre": "Coiffeur.euse",
      "ligne": "Couper, coiffer et conseiller, dans le contact et le style.",
      "univers": [
        "contact-aide",
        "creation-idees"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/D1202/"
    },
    {
      "code_rome": "A1414",
      "titre": "Maraîcher.ère",
      "ligne": "Cultiver et récolter fruits et légumes en plein air.",
      "univers": [
        "nature-plein-air",
        "concret-matiere"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/A1414/"
    },
    {
      "code_rome": "A1203",
      "titre": "Jardinier.ère paysagiste",
      "ligne": "Concevoir et entretenir jardins et espaces verts.",
      "univers": [
        "nature-plein-air",
        "creation-idees"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/A1203/"
    },
    {
      "code_rome": "A1416",
      "titre": "Éleveur.euse",
      "ligne": "Prendre soin des animaux et faire vivre une exploitation.",
      "univers": [
        "nature-plein-air",
        "contact-aide"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/A1416/"
    },
    {
      "code_rome": "A1201",
      "titre": "Bûcheron.ne / Élagueur.euse",
      "ligne": "Couper, élaguer et entretenir les arbres en forêt.",
      "univers": [
        "nature-plein-air",
        "mouvement-action"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/A1201/"
    },
    {
      "code_rome": "A1404",
      "titre": "Conchyliculteur.rice (ostréiculture)",
      "ligne": "Élever huîtres et coquillages au rythme des marées.",
      "univers": [
        "nature-plein-air",
        "mouvement-action"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/A1404/"
    },
    {
      "code_rome": "E1205",
      "titre": "Graphiste",
      "ligne": "Créer visuels, logos et mises en page pour communiquer.",
      "univers": [
        "creation-idees",
        "organisation-rigueur"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/E1205/"
    },
    {
      "code_rome": "E1201",
      "titre": "Photographe",
      "ligne": "Capturer et composer des images qui racontent.",
      "univers": [
        "creation-idees"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/E1201/"
    },
    {
      "code_rome": "B1201",
      "titre": "Céramiste / Potier.ère",
      "ligne": "Façonner et cuire des pièces en terre, à la main.",
      "univers": [
        "creation-idees",
        "concret-matiere"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/B1201/"
    },
    {
      "code_rome": "G1602",
      "titre": "Cuisinier.ère",
      "ligne": "Imaginer et dresser des plats, dans le feu du service.",
      "univers": [
        "creation-idees",
        "concret-matiere",
        "mouvement-action"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/G1602/"
    },
    {
      "code_rome": "F1101",
      "titre": "Architecte",
      "ligne": "Concevoir des bâtiments, du croquis au plan détaillé.",
      "univers": [
        "creation-idees",
        "organisation-rigueur"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/F1101/"
    },
    {
      "code_rome": "L1202",
      "titre": "Musicien.ne",
      "ligne": "Jouer, composer et faire vivre la musique.",
      "univers": [
        "creation-idees"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/L1202/"
    },
    {
      "code_rome": "M1203",
      "titre": "Comptable",
      "ligne": "Tenir les comptes et fiabiliser les chiffres d'une structure.",
      "univers": [
        "organisation-rigueur"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/M1203/"
    },
    {
      "code_rome": "M1607",
      "titre": "Secrétaire / Assistant.e administratif.ve",
      "ligne": "Organiser, suivre et fluidifier la vie d'un service.",
      "univers": [
        "organisation-rigueur",
        "contact-aide"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/M1607/"
    },
    {
      "code_rome": "J1302",
      "titre": "Technicien.ne de laboratoire",
      "ligne": "Réaliser des analyses précises et fiables en labo.",
      "univers": [
        "organisation-rigueur",
        "concret-matiere"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/J1302/"
    },
    {
      "code_rome": "N1103",
      "titre": "Préparateur.rice de commandes",
      "ligne": "Préparer et expédier les commandes, au bon rythme.",
      "univers": [
        "organisation-rigueur",
        "mouvement-action"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/N1103/"
    },
    {
      "code_rome": "J1307",
      "titre": "Préparateur.rice en pharmacie",
      "ligne": "Délivrer et préparer les médicaments, au contact du public.",
      "univers": [
        "organisation-rigueur",
        "contact-aide"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/J1307/"
    },
    {
      "code_rome": "K1705",
      "titre": "Sapeur-pompier",
      "ligne": "Intervenir, secourir et protéger, dans l'action.",
      "univers": [
        "mouvement-action",
        "contact-aide"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/K1705/"
    },
    {
      "code_rome": "J1305",
      "titre": "Ambulancier.ère",
      "ligne": "Transporter et veiller sur les patients en urgence.",
      "univers": [
        "mouvement-action",
        "contact-aide"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/J1305/"
    },
    {
      "code_rome": "G1204",
      "titre": "Éducateur.rice sportif.ve",
      "ligne": "Animer, entraîner et motiver autour du sport.",
      "univers": [
        "mouvement-action",
        "contact-aide"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/G1204/"
    },
    {
      "code_rome": "N4105",
      "titre": "Livreur.euse / Coursier.ère",
      "ligne": "Livrer en tournée, toujours en mouvement.",
      "univers": [
        "mouvement-action"
      ],
      "metierscope_url": "https://candidat.francetravail.fr/metierscope/fiche-metier/N4105/"
    }
  ]
};
