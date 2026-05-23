/**
 * feature-flags.config.ts
 * ========================
 * Central feature flag system for Cheers Magazine.
 * Toggle features ON/OFF for testing or staged rollouts.
 * All flags are driven by environment variables.
 */

export interface FeatureFlags {
  /** Enable/disable all sound effects */
  sounds: boolean;
  /** Enable/disable page flip and UI animations */
  animations: boolean;
  /** Enable/disable anti-piracy overlay system */
  antiPiracy: boolean;
  /** Enable/disable user watermark on pages */
  watermark: boolean;
  /** Enable/disable fullscreen reader mode */
  fullscreen: boolean;
  /** Enable/disable developer debug mode */
  debugMode: boolean;
  /** Enable/disable payment flows */
  payments: boolean;
}

/**
 * Reads all feature flags from environment variables.
 * Falls back to safe defaults if variables are missing.
 */
export const featureFlags: FeatureFlags = {
  sounds:     process.env.NEXT_PUBLIC_FEATURE_SOUNDS      !== 'false',
  animations: process.env.NEXT_PUBLIC_FEATURE_ANIMATIONS  !== 'false',
  antiPiracy: process.env.NEXT_PUBLIC_FEATURE_ANTI_PIRACY === 'true',
  watermark:  process.env.NEXT_PUBLIC_FEATURE_WATERMARK   !== 'false',
  fullscreen: process.env.NEXT_PUBLIC_FEATURE_FULLSCREEN  !== 'false',
  debugMode:  process.env.NEXT_PUBLIC_FEATURE_DEBUG_MODE  === 'true',
  payments:   process.env.NEXT_PUBLIC_FEATURE_PAYMENTS    === 'true',
};

/**
 * Runtime feature flag override (for dev testing panel).
 * Stored in sessionStorage so overrides reset on tab close.
 */
export function getFeatureFlag(key: keyof FeatureFlags): boolean {
  if (typeof window === 'undefined') return featureFlags[key];
  const override = sessionStorage.getItem(`ff_${key}`);
  if (override !== null) return override === 'true';
  return featureFlags[key];
}

export function setFeatureFlag(key: keyof FeatureFlags, value: boolean): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(`ff_${key}`, String(value));
  // Dispatch custom event so UI can react
  window.dispatchEvent(new CustomEvent('feature-flag-change', { detail: { key, value } }));
}

export function resetAllFeatureFlags(): void {
  if (typeof window === 'undefined') return;
  Object.keys(featureFlags).forEach(key => {
    sessionStorage.removeItem(`ff_${key}`);
  });
}
