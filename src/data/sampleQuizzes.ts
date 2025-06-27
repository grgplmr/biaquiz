import { Quiz } from '../types/quiz';

export const sampleQuizzes: Quiz[] = [
  {
    id: 1,
    title: 'Quiz 1 - Principes de base',
    category: 'aerodynamics',
    createdAt: '2024-01-15',
    questions: [
      {
        id: 1,
        question: 'Quelle est la force qui s\'oppose au mouvement d\'un avion dans l\'air ?',
        options: ['La portance', 'La traînée', 'Le poids', 'La poussée'],
        correctAnswer: 1,
        explanation: 'La traînée est la force qui s\'oppose au mouvement de l\'avion dans l\'air.'
      },
      {
        id: 2,
        question: 'La portance est générée principalement par :',
        options: ['Le dessous de l\'aile', 'Le dessus de l\'aile', 'Les deux faces également', 'L\'hélice'],
        correctAnswer: 1,
        explanation: 'La portance est principalement générée par la dépression créée au dessus de l\'aile.'
      },
      {
        id: 3,
        question: 'L\'angle d\'incidence est l\'angle entre :',
        options: ['L\'aile et l\'horizon', 'La corde de l\'aile et le vent relatif', 'L\'axe de l\'avion et l\'horizon', 'L\'hélice et l\'axe moteur'],
        correctAnswer: 1,
        explanation: 'L\'angle d\'incidence est l\'angle formé entre la corde de l\'aile et la direction du vent relatif.'
      },
      {
        id: 4,
        question: 'Le décrochage se produit quand :',
        options: ['La vitesse est trop élevée', 'L\'angle d\'incidence est trop important', 'Le moteur s\'arrête', 'L\'altitude est trop élevée'],
        correctAnswer: 1,
        explanation: 'Le décrochage se produit lorsque l\'angle d\'incidence dépasse l\'angle critique.'
      },
      {
        id: 5,
        question: 'En vol de croisière, les quatre forces sont :',
        options: ['Déséquilibrées', 'En équilibre', 'Variables', 'Inexistantes'],
        correctAnswer: 1,
        explanation: 'En vol de croisière rectiligne uniforme, les quatre forces (portance, poids, poussée, traînée) sont en équilibre.'
      },
      {
        id: 6,
        question: 'Pour augmenter la portance, on peut :',
        options: ['Diminuer la vitesse', 'Augmenter l\'angle d\'incidence', 'Réduire la surface alaire', 'Fermer les volets'],
        correctAnswer: 1,
        explanation: 'Augmenter l\'angle d\'incidence (dans les limites) permet d\'augmenter la portance.'
      },
      {
        id: 7,
        question: 'Le facteur de charge en virage à 60° d\'inclinaison est de :',
        options: ['1', '1,41', '2', '2,5'],
        correctAnswer: 2,
        explanation: 'En virage à 60° d\'inclinaison, le facteur de charge est de 2.'
      },
      {
        id: 8,
        question: 'La vitesse de décrochage en virage :',
        options: ['Diminue', 'Reste constante', 'Augmente', 'Varie selon l\'altitude'],
        correctAnswer: 2,
        explanation: 'La vitesse de décrochage augmente en virage à cause du facteur de charge.'
      },
      {
        id: 9,
        question: 'L\'effet de sol se manifeste :',
        options: ['À haute altitude', 'En croisière', 'Près du sol', 'En montée'],
        correctAnswer: 2,
        explanation: 'L\'effet de sol se manifeste quand l\'avion évolue près du sol (moins d\'une envergure).'
      },
      {
        id: 10,
        question: 'Les volets permettent de :',
        options: ['Augmenter la vitesse', 'Diminuer la traînée', 'Augmenter la portance à basse vitesse', 'Réduire le poids'],
        correctAnswer: 2,
        explanation: 'Les volets augmentent la portance et permettent de voler à plus basse vitesse.'
      },
      {
        id: 11,
        question: 'En montée, la composante du poids qui s\'oppose au mouvement est :',
        options: ['Nulle', 'Parallèle à la trajectoire', 'Perpendiculaire à la trajectoire', 'Variable'],
        correctAnswer: 1,
        explanation: 'En montée, une composante du poids s\'oppose au mouvement parallèlement à la trajectoire.'
      },
      {
        id: 12,
        question: 'La finesse d\'un planeur est le rapport :',
        options: ['Portance/Traînée', 'Poids/Portance', 'Vitesse/Altitude', 'Distance/Temps'],
        correctAnswer: 0,
        explanation: 'La finesse est le rapport entre la portance et la traînée.'
      },
      {
        id: 13,
        question: 'Le centre de poussée se déplace vers :',
        options: ['L\'avant quand l\'incidence augmente', 'L\'arrière quand l\'incidence augmente', 'Il ne bouge pas', 'Le haut quand l\'incidence augmente'],
        correctAnswer: 1,
        explanation: 'Le centre de poussée se déplace vers l\'arrière quand l\'angle d\'incidence augmente.'
      },
      {
        id: 14,
        question: 'La résultante aérodynamique est :',
        options: ['La somme de la portance et de la traînée', 'La différence entre portance et traînée', 'Égale à la portance', 'Égale à la traînée'],
        correctAnswer: 0,
        explanation: 'La résultante aérodynamique est la résultante vectorielle de la portance et de la traînée.'
      },
      {
        id: 15,
        question: 'En atmosphère standard, la pression diminue d\'environ :',
        options: ['1 hPa par 8 mètres', '1 hPa par 28 pieds', '1 hPa par 8 pieds', '1 hPa par 28 mètres'],
        correctAnswer: 3,
        explanation: 'En atmosphère standard, la pression diminue d\'environ 1 hPa par 28 pieds ou 8,5 mètres.'
      },
      {
        id: 16,
        question: 'L\'hypersustentation permet de :',
        options: ['Voler plus vite', 'Réduire les vitesses d\'approche et d\'atterrissage', 'Économiser le carburant', 'Monter plus haut'],
        correctAnswer: 1,
        explanation: 'L\'hypersustentation permet de réduire les vitesses d\'approche et d\'atterrissage.'
      },
      {
        id: 17,
        question: 'Le lacet inverse en virage est dû à :',
        options: ['La traînée différentielle des ailerons', 'La gouverne de direction', 'Le couple moteur', 'L\'effet gyroscopique'],
        correctAnswer: 0,
        explanation: 'Le lacet inverse est causé par la traînée différentielle des ailerons.'
      },
      {
        id: 18,
        question: 'La polaire d\'un avion représente :',
        options: ['Sa vitesse maximale', 'La relation entre portance et incidence', 'La relation entre traînée et portance', 'Son autonomie'],
        correctAnswer: 2,
        explanation: 'La polaire représente la relation entre le coefficient de traînée et le coefficient de portance.'
      },
      {
        id: 19,
        question: 'En cas de panne moteur, pour planer le plus loin possible, il faut voler à :',
        options: ['Vitesse minimale', 'Vitesse de finesse max', 'Vitesse maximale', 'Vitesse de décrochage'],
        correctAnswer: 1,
        explanation: 'Pour planer le plus loin possible, il faut voler à la vitesse de finesse maximale.'
      },
      {
        id: 20,
        question: 'L\'allongement d\'une aile est le rapport :',
        options: ['Envergure/Corde', 'Envergure²/Surface', 'Surface/Envergure', 'Corde/Envergure'],
        correctAnswer: 1,
        explanation: 'L\'allongement est le rapport entre le carré de l\'envergure et la surface alaire.'
      }
    ]
  },
  {
    id: 2,
    title: 'Quiz 1 - Structure et systèmes',
    category: 'aircraft',
    createdAt: '2024-01-20',
    questions: [
      {
        id: 21,
        question: 'Le fuselage d\'un avion a pour fonction principale de :',
        options: ['Générer la portance', 'Abriter l\'équipage et les passagers', 'Diriger l\'avion', 'Freiner l\'avion'],
        correctAnswer: 1,
        explanation: 'Le fuselage abrite l\'équipage, les passagers et les équipements.'
      },
      {
        id: 22,
        question: 'Les ailerons servent à contrôler :',
        options: ['Le tangage', 'Le roulis', 'Le lacet', 'La vitesse'],
        correctAnswer: 1,
        explanation: 'Les ailerons contrôlent le mouvement de roulis autour de l\'axe longitudinal.'
      },
      {
        id: 23,
        question: 'La gouverne de profondeur contrôle :',
        options: ['Le roulis', 'Le lacet', 'Le tangage', 'La poussée'],
        correctAnswer: 2,
        explanation: 'La gouverne de profondeur contrôle le tangage autour de l\'axe transversal.'
      },
      {
        id: 24,
        question: 'Le gouvernail de direction contrôle :',
        options: ['Le tangage', 'Le roulis', 'Le lacet', 'L\'altitude'],
        correctAnswer: 2,
        explanation: 'Le gouvernail de direction contrôle le lacet autour de l\'axe vertical.'
      },
      {
        id: 25,
        question: 'Les instruments de vol de base sont au nombre de :',
        options: ['4', '5', '6', '7'],
        correctAnswer: 2,
        explanation: 'Les 6 instruments de base sont : anémomètre, horizon artificiel, altimètre, conservateur de cap, variomètre, coordonnateur de virage.'
      },
      {
        id: 26,
        question: 'L\'anémomètre mesure :',
        options: ['La vitesse vraie', 'La vitesse indiquée', 'La vitesse sol', 'La vitesse propre'],
        correctAnswer: 1,
        explanation: 'L\'anémomètre indique la vitesse indiquée (IAS - Indicated Air Speed).'
      },
      {
        id: 27,
        question: 'L\'altimètre fonctionne grâce à :',
        options: ['Un gyroscope', 'La pression statique', 'La pression dynamique', 'Un GPS'],
        correctAnswer: 1,
        explanation: 'L\'altimètre fonctionne en mesurant la pression statique ambiante.'
      },
      {
        id: 28,
        question: 'Le variomètre indique :',
        options: ['L\'altitude', 'La vitesse verticale', 'La vitesse horizontale', 'L\'accélération'],
        correctAnswer: 1,
        explanation: 'Le variomètre indique la vitesse verticale (taux de montée ou de descente).'
      },
      {
        id: 29,
        question: 'L\'horizon artificiel fonctionne grâce à :',
        options: ['La pression', 'Un gyroscope', 'Un GPS', 'Un accéléromètre'],
        correctAnswer: 1,
        explanation: 'L\'horizon artificiel utilise un gyroscope pour maintenir une référence d\'assiette.'
      },
      {
        id: 30,
        question: 'Le train d\'atterrissage tricycle a l\'avantage d\'être :',
        options: ['Plus léger', 'Plus stable au sol', 'Plus rapide', 'Plus économique'],
        correctAnswer: 1,
        explanation: 'Le train tricycle offre une meilleure stabilité au sol et facilite le pilotage.'
      },
      {
        id: 31,
        question: 'Les freins d\'un avion agissent sur :',
        options: ['Toutes les roues', 'Les roues principales seulement', 'La roue de nez seulement', 'L\'hélice'],
        correctAnswer: 1,
        explanation: 'Les freins agissent uniquement sur les roues principales du train d\'atterrissage.'
      },
      {
        id: 32,
        question: 'Le système électrique d\'un avion comprend généralement :',
        options: ['Une batterie seulement', 'Un alternateur seulement', 'Une batterie et un alternateur', 'Aucun des deux'],
        correctAnswer: 2,
        explanation: 'Le système électrique comprend une batterie pour le démarrage et un alternateur pour la production.'
      },
      {
        id: 33,
        question: 'Le compensateur sert à :',
        options: ['Augmenter la vitesse', 'Réduire les efforts sur les commandes', 'Améliorer la visibilité', 'Refroidir le moteur'],
        correctAnswer: 1,
        explanation: 'Le compensateur permet de réduire ou annuler les efforts sur les commandes de vol.'
      },
      {
        id: 34,
        question: 'Les phares de navigation comprennent :',
        options: ['2 feux', '3 feux', '4 feux', '5 feux'],
        correctAnswer: 1,
        explanation: 'Les feux de navigation sont : rouge à gauche, vert à droite, blanc à l\'arrière.'
      },
      {
        id: 35,
        question: 'Le transpondeur sert à :',
        options: ['Naviguer', 'Communiquer par radio', 'Être identifié par le radar', 'Mesurer l\'altitude'],
        correctAnswer: 2,
        explanation: 'Le transpondeur permet à l\'avion d\'être identifié sur les écrans radar du contrôle aérien.'
      },
      {
        id: 36,
        question: 'En cas de panne électrique, quels instruments continuent de fonctionner ?',
        options: ['Tous les instruments', 'Aucun instrument', 'Les instruments gyroscopiques à dépression', 'Seulement l\'altimètre'],
        correctAnswer: 2,
        explanation: 'Les instruments gyroscopiques pneumatiques continuent de fonctionner en cas de panne électrique.'
      },
      {
        id: 37,
        question: 'La masse maximale au décollage (MTOW) ne doit jamais être :',
        options: ['Atteinte', 'Dépassée', 'Calculée', 'Vérifiée'],
        correctAnswer: 1,
        explanation: 'La masse maximale au décollage ne doit jamais être dépassée pour des raisons de sécurité.'
      },
      {
        id: 38,
        question: 'Le centrage d\'un avion doit être maintenu :',
        options: ['À l\'avant du domaine', 'À l\'arrière du domaine', 'Dans le domaine autorisé', 'Au centre exact'],
        correctAnswer: 2,
        explanation: 'Le centrage doit impérativement rester dans le domaine autorisé pour la sécurité du vol.'
      },
      {
        id: 39,
        question: 'La casserole d\'hélice sert à :',
        options: ['Augmenter la poussée', 'Améliorer l\'aérodynamisme', 'Refroidir le moteur', 'Réduire le bruit'],
        correctAnswer: 1,
        explanation: 'La casserole d\'hélice améliore l\'aérodynamisme en réduisant la traînée au moyeu.'
      },
      {
        id: 40,
        question: 'Les volets de courbure permettent de :',
        options: ['Augmenter la vitesse maximale', 'Modifier la cambrure de l\'aile', 'Réduire le poids', 'Améliorer la visibilité'],
        correctAnswer: 1,
        explanation: 'Les volets de courbure modifient la cambrure de l\'aile pour augmenter la portance.'
      }
    ]
  },
  {
    id: 3,
    title: 'Quiz 1 - Météorologie générale',
    category: 'meteorology',
    createdAt: '2024-01-25',
    questions: [
      {
        id: 41,
        question: 'L\'atmosphère est composée principalement de :',
        options: ['Oxygène (78%) et azote (21%)', 'Azote (78%) et oxygène (21%)', 'Oxygène (50%) et azote (50%)', 'Azote (50%) et oxygène (50%)'],
        correctAnswer: 1,
        explanation: 'L\'atmosphère contient environ 78% d\'azote et 21% d\'oxygène.'
      },
      {
        id: 42,
        question: 'La pression atmosphérique standard au niveau de la mer est de :',
        options: ['1000 hPa', '1013,25 hPa', '1020 hPa', '1030 hPa'],
        correctAnswer: 1,
        explanation: 'La pression standard (QNH) au niveau de la mer est de 1013,25 hPa.'
      },
      {
        id: 43,
        question: 'La température standard au niveau de la mer est de :',
        options: ['0°C', '15°C', '20°C', '25°C'],
        correctAnswer: 1,
        explanation: 'La température standard ISA au niveau de la mer est de 15°C (59°F).'
      },
      {
        id: 44,
        question: 'Le gradient thermique vertical standard est de :',
        options: ['2°C par 1000 ft', '2°C par 1000 m', '2°C par 100 ft', '6,5°C par 1000 m'],
        correctAnswer: 0,
        explanation: 'Le gradient thermique standard est de 2°C par 1000 pieds (6,5°C par 1000m).'
      },
      {
        id: 45,
        question: 'Un anticyclone est caractérisé par :',
        options: ['Des pressions basses', 'Des pressions hautes', 'Des vents forts', 'De la pluie'],
        correctAnswer: 1,
        explanation: 'Un anticyclone est une zone de hautes pressions atmosphériques.'
      },
      {
        id: 46,
        question: 'Une dépression est caractérisée par :',
        options: ['Des pressions hautes', 'Des pressions basses', 'Un temps stable', 'Pas de vent'],
        correctAnswer: 1,
        explanation: 'Une dépression est une zone de basses pressions atmosphériques.'
      },
      {
        id: 47,
        question: 'Dans l\'hémisphère nord, les vents tournent autour d\'un anticyclone :',
        options: ['Dans le sens horaire', 'Dans le sens antihoraire', 'Ils ne tournent pas', 'Selon la saison'],
        correctAnswer: 0,
        explanation: 'Dans l\'hémisphère nord, les vents tournent dans le sens horaire autour d\'un anticyclone.'
      },
      {
        id: 48,
        question: 'Les cumulus sont des nuages :',
        options: ['De beau temps', 'D\'orage', 'De pluie continue', 'De brouillard'],
        correctAnswer: 0,
        explanation: 'Les cumulus sont généralement des nuages de beau temps, à développement vertical.'
      },
      {
        id: 49,
        question: 'Les stratus sont des nuages :',
        options: ['Très hauts', 'En couches', 'À développement vertical', 'Inexistants'],
        correctAnswer: 1,
        explanation: 'Les stratus sont des nuages stratiformes, disposés en couches.'
      },
      {
        id: 50,
        question: 'Le brouillard de rayonnement se forme :',
        options: ['Le jour par beau temps', 'La nuit par ciel clair', 'En altitude', 'En mer'],
        correctAnswer: 1,
        explanation: 'Le brouillard de rayonnement se forme la nuit par ciel clair et vent faible.'
      },
      {
        id: 51,
        question: 'La visibilité est considérée comme bonne quand elle dépasse :',
        options: ['1 km', '5 km', '8 km', '10 km'],
        correctAnswer: 3,
        explanation: 'Une visibilité supérieure à 10 km est considérée comme bonne.'
      },
      {
        id: 52,
        question: 'Un front froid apporte généralement :',
        options: ['Un temps stable', 'Des averses et des éclaircies', 'De la pluie continue', 'Du brouillard'],
        correctAnswer: 1,
        explanation: 'Un front froid apporte généralement des averses suivies d\'éclaircies.'
      },
      {
        id: 53,
        question: 'Un front chaud apporte généralement :',
        options: ['Des orages violents', 'De la pluie continue', 'Du beau temps', 'Du vent fort'],
        correctAnswer: 1,
        explanation: 'Un front chaud apporte généralement des précipitations continues.'
      },
      {
        id: 54,
        question: 'L\'humidité relative de 100% signifie :',
        options: ['Qu\'il pleut', 'Que l\'air est saturé', 'Qu\'il fait chaud', 'Qu\'il y a du vent'],
        correctAnswer: 1,
        explanation: 'Une humidité relative de 100% signifie que l\'air est saturé en vapeur d\'eau.'
      },
      {
        id: 55,
        question: 'Le point de rosée est :',
        options: ['Toujours égal à la température', 'Toujours supérieur à la température', 'Toujours inférieur ou égal à la température', 'Variable selon l\'altitude'],
        correctAnswer: 2,
        explanation: 'Le point de rosée est toujours inférieur ou égal à la température de l\'air.'
      },
      {
        id: 56,
        question: 'Les nuages se forment quand :',
        options: ['Il fait chaud', 'L\'air se réchauffe', 'L\'air se refroidit jusqu\'à saturation', 'Il y a du vent'],
        correctAnswer: 2,
        explanation: 'Les nuages se forment quand l\'air se refroidit jusqu\'à atteindre la saturation.'
      },
      {
        id: 57,
        question: 'Le givrage est dangereux car il :',
        options: ['Rend l\'avion plus lourd', 'Modifie l\'aérodynamisme', 'Peut bloquer les instruments', 'Tout cela à la fois'],
        correctAnswer: 3,
        explanation: 'Le givrage est dangereux car il cumule tous ces effets néfastes.'
      },
      {
        id: 58,
        question: 'Les orages se développent dans des nuages :',
        options: ['Stratus', 'Cumulus', 'Cumulonimbus', 'Cirrus'],
        correctAnswer: 2,
        explanation: 'Les orages se développent dans les cumulonimbus.'
      },
      {
        id: 59,
        question: 'La turbulence de sillage est maximale quand l\'avion générateur est :',
        options: ['Léger et rapide', 'Lourd et lent', 'Lourd et rapide', 'Léger et lent'],
        correctAnswer: 1,
        explanation: 'La turbulence de sillage est maximale pour un avion lourd volant lentement.'
      },
      {
        id: 60,
        question: 'Les isohypses relient les points de :',
        options: ['Même pression', 'Même température', 'Même altitude', 'Même vent'],
        correctAnswer: 2,
        explanation: 'Les isohypses relient les points de même altitude géopotentielle.'
      }
    ]
  }
];