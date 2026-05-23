/**
 * use-immersive-fullscreen-reader.ts
 * ====================================
 * Manages fullscreen mode for the Cheers Magazine reader.
 * Handles browser API differences, keyboard shortcuts, and state.
 */

import { useCallback, useEffect, useState } from 'react';
import { getFeatureFlag } from '@/config/feature-flags.config';

interface UseImmersiveFullscreenReturn {
  isFullscreen: boolean;
  isSupported: boolean;
  enter: (element?: HTMLElement | null) => Promise<void>;
  exit: () => Promise<void>;
  toggle: (element?: HTMLElement | null) => Promise<void>;
}

export function useImmersiveFullscreenReader(): UseImmersiveFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isSupported = typeof document !== 'undefined' && 'fullscreenElement' in document;
  const featureEnabled = getFeatureFlag('fullscreen');

  useEffect(() => {
    if (!isSupported) return;

    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleChange);
    document.addEventListener('webkitfullscreenchange', handleChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleChange);
      document.removeEventListener('webkitfullscreenchange', handleChange);
    };
  }, [isSupported]);

  // ESC key to exit (in addition to browser default)
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  const enter = useCallback(async (element?: HTMLElement | null) => {
    if (!featureEnabled || !isSupported) return;
    const target = element ?? document.documentElement;
    try {
      if (target.requestFullscreen) {
        await target.requestFullscreen();
      } else if ((target as any).webkitRequestFullscreen) {
        await (target as any).webkitRequestFullscreen();
      }
    } catch (err) {
      console.warn('[Fullscreen] Could not enter fullscreen:', err);
    }
  }, [featureEnabled, isSupported]);

  const exit = useCallback(async () => {
    if (!isSupported) return;
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      }
    } catch (err) {
      console.warn('[Fullscreen] Could not exit fullscreen:', err);
    }
  }, [isSupported]);

  const toggle = useCallback(async (element?: HTMLElement | null) => {
    if (isFullscreen) {
      await exit();
    } else {
      await enter(element);
    }
  }, [isFullscreen, enter, exit]);

  return { isFullscreen, isSupported, enter, exit, toggle };
}
