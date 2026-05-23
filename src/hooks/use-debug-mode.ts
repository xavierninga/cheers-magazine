/**
 * use-debug-mode.ts
 * =================
 * Developer debug mode for Cheers Magazine.
 * Tracks FPS, memory, loading states, and render events.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { getFeatureFlag } from '@/config/feature-flags.config';

export interface DebugStats {
  fps: number;
  memoryMB: number | null;
  renderCount: number;
  loadingStates: Record<string, boolean>;
  soundTriggers: string[];
  pageTransitions: number;
  preloadStatus: Record<string, 'pending' | 'loaded' | 'error'>;
  lastEvent: string;
}

const DEFAULT_STATS: DebugStats = {
  fps: 0,
  memoryMB: null,
  renderCount: 0,
  loadingStates: {},
  soundTriggers: [],
  pageTransitions: 0,
  preloadStatus: {},
  lastEvent: 'none',
};

export function useDebugMode() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [stats, setStats] = useState<DebugStats>(DEFAULT_STATS);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);

  // Check if debug mode is enabled
  useEffect(() => {
    setIsEnabled(getFeatureFlag('debugMode'));
  }, []);

  // FPS counter
  useEffect(() => {
    if (!isEnabled) return;

    const measureFPS = (time: number) => {
      frameCountRef.current++;
      const elapsed = time - lastTimeRef.current;
      if (elapsed >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / elapsed);
        frameCountRef.current = 0;
        lastTimeRef.current = time;

        // Memory (Chrome only)
        let memoryMB: number | null = null;
        if ('memory' in performance) {
          const mem = (performance as any).memory;
          memoryMB = Math.round(mem.usedJSHeapSize / 1024 / 1024);
        }

        setStats(prev => ({ ...prev, fps, memoryMB }));
      }
      frameRef.current = requestAnimationFrame(measureFPS);
    };

    frameRef.current = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isEnabled]);

  const logEvent = useCallback((event: string) => {
    if (!isEnabled) return;
    console.log(`[DEBUG] ${event}`);
    setStats(prev => ({
      ...prev,
      lastEvent: event,
      renderCount: prev.renderCount + 1,
    }));
  }, [isEnabled]);

  const logSoundTrigger = useCallback((soundId: string) => {
    if (!isEnabled) return;
    setStats(prev => ({
      ...prev,
      soundTriggers: [soundId, ...prev.soundTriggers.slice(0, 9)],
    }));
  }, [isEnabled]);

  const setLoadingState = useCallback((key: string, loading: boolean) => {
    if (!isEnabled) return;
    setStats(prev => ({
      ...prev,
      loadingStates: { ...prev.loadingStates, [key]: loading },
    }));
  }, [isEnabled]);

  const setPreloadStatus = useCallback((
    key: string,
    status: 'pending' | 'loaded' | 'error'
  ) => {
    setStats(prev => ({
      ...prev,
      preloadStatus: { ...prev.preloadStatus, [key]: status },
    }));
  }, []);

  const logPageTransition = useCallback(() => {
    setStats(prev => ({ ...prev, pageTransitions: prev.pageTransitions + 1 }));
  }, []);

  const toggle = useCallback(() => setIsEnabled(v => !v), []);
  const reset = useCallback(() => setStats(DEFAULT_STATS), []);

  return {
    isEnabled,
    toggle,
    reset,
    stats,
    logEvent,
    logSoundTrigger,
    setLoadingState,
    setPreloadStatus,
    logPageTransition,
  };
}
