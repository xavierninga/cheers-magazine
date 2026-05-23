/**
 * sound-system.config.ts
 * ======================
 * Complete sound effect registry for Cheers Magazine.
 * All sounds are labeled, categorized, and easily testable.
 */

export type SoundCategory =
  | 'page-flip'
  | 'hover'
  | 'click'
  | 'transition'
  | 'notification'
  | 'immersive';

export interface SoundDefinition {
  id: string;
  label: string;
  category: SoundCategory;
  /** Path relative to /public/sounds/ */
  path: string;
  defaultVolume: number;
  description: string;
}

/**
 * Full sound registry.
 * Files must exist at /public/sounds/<category>/<filename>
 * Use the Sound Lab (/dev-testing/sound-lab) to test all sounds.
 */
export const SOUND_REGISTRY: SoundDefinition[] = [
  // ---- Page Flip ----
  {
    id: 'page-flip-soft',
    label: 'Page Flip (Soft)',
    category: 'page-flip',
    path: '/sounds/page-flip/page-flip-soft.mp3',
    defaultVolume: 0.6,
    description: 'Soft magazine page turn — light paper weight',
  },
  {
    id: 'page-flip-hard',
    label: 'Page Flip (Hard)',
    category: 'page-flip',
    path: '/sounds/page-flip/page-flip-hard.mp3',
    defaultVolume: 0.7,
    description: 'Crisp magazine page turn — glossy heavy paper',
  },
  {
    id: 'page-flip-quick',
    label: 'Page Flip (Quick)',
    category: 'page-flip',
    path: '/sounds/page-flip/page-flip-quick.mp3',
    defaultVolume: 0.5,
    description: 'Fast swipe page turn for mobile',
  },
  // ---- Hover ----
  {
    id: 'luxury-hover',
    label: 'Luxury Hover',
    category: 'hover',
    path: '/sounds/hover/luxury-hover.mp3',
    defaultVolume: 0.3,
    description: 'Subtle premium hover tone',
  },
  {
    id: 'nav-hover',
    label: 'Nav Hover',
    category: 'hover',
    path: '/sounds/hover/nav-hover.mp3',
    defaultVolume: 0.2,
    description: 'Light navigation item hover',
  },
  // ---- Click ----
  {
    id: 'premium-click',
    label: 'Premium Click',
    category: 'click',
    path: '/sounds/click/premium-click.mp3',
    defaultVolume: 0.5,
    description: 'Satisfying premium button click',
  },
  {
    id: 'nav-click',
    label: 'Navigation Click',
    category: 'click',
    path: '/sounds/click/nav-click.mp3',
    defaultVolume: 0.4,
    description: 'Clean navigation click',
  },
  // ---- Transitions ----
  {
    id: 'cinematic-transition',
    label: 'Cinematic Transition',
    category: 'transition',
    path: '/sounds/transitions/cinematic-transition.mp3',
    defaultVolume: 0.6,
    description: 'Dramatic cinematic page section transition',
  },
  {
    id: 'smooth-transition',
    label: 'Smooth Transition',
    category: 'transition',
    path: '/sounds/transitions/smooth-transition.mp3',
    defaultVolume: 0.5,
    description: 'Smooth minimal UI transition',
  },
  // ---- Notifications ----
  {
    id: 'success-notification',
    label: 'Success',
    category: 'notification',
    path: '/sounds/notifications/success-notification.mp3',
    defaultVolume: 0.6,
    description: 'Success state notification chime',
  },
  {
    id: 'error-notification',
    label: 'Error',
    category: 'notification',
    path: '/sounds/notifications/error-notification.mp3',
    defaultVolume: 0.5,
    description: 'Error state notification',
  },
  // ---- Immersive ----
  {
    id: 'magazine-open',
    label: 'Magazine Open',
    category: 'immersive',
    path: '/sounds/immersive/magazine-open.mp3',
    defaultVolume: 0.7,
    description: 'Immersive magazine opening experience sound',
  },
  {
    id: 'reader-ambient',
    label: 'Reader Ambient',
    category: 'immersive',
    path: '/sounds/immersive/reader-ambient.mp3',
    defaultVolume: 0.15,
    description: 'Very soft ambient loop during reading',
  },
];

export const SOUND_CATEGORIES: SoundCategory[] = [
  'page-flip',
  'hover',
  'click',
  'transition',
  'notification',
  'immersive',
];

/** Lookup a sound by ID */
export function getSoundById(id: string): SoundDefinition | undefined {
  return SOUND_REGISTRY.find(s => s.id === id);
}

/** Get all sounds in a category */
export function getSoundsByCategory(category: SoundCategory): SoundDefinition[] {
  return SOUND_REGISTRY.filter(s => s.category === category);
}
