import { QuizCategory } from '../types/quiz';

export const categories: QuizCategory[] = [
  {
    id: 'aerodynamics',
    name: 'Aérodynamique et mécanique du vol',
    description: 'Principes de vol, portance, traînée, facteurs de charge',
    icon: 'Plane',
    color: 'bg-blue-500'
  },
  {
    id: 'aircraft',
    name: 'Connaissance des aéronefs',
    description: 'Structure, systèmes, motorisation, équipements',
    icon: 'Settings',
    color: 'bg-indigo-500'
  },
  {
    id: 'meteorology',
    name: 'Météorologie',
    description: 'Masses d\'air, nuages, phénomènes météorologiques',
    icon: 'Cloud',
    color: 'bg-cyan-500'
  },
  {
    id: 'navigation',
    name: 'Navigation, règlementation et sécurité',
    description: 'Navigation, réglementation aérienne, sécurité des vols',
    icon: 'Compass',
    color: 'bg-green-500'
  },
  {
    id: 'history',
    name: 'Histoire de l\'aéronautique et de l\'espace',
    description: 'Pionniers, évolution technologique, conquête spatiale',
    icon: 'Rocket',
    color: 'bg-purple-500'
  },
  {
    id: 'english',
    name: 'Anglais aéronautique',
    description: 'Vocabulaire technique, phraséologie radio',
    icon: 'Languages',
    color: 'bg-orange-500'
  }
];