/**
 * use-sound-manager.ts
 * ====================
 * Core sound management hook for Cheers Magazine.
 * Uses Howler.js for reliable cross-browser audio.
 * Respects feature flags and persists volume preferences.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { getFeatureFlag } from '@/config/feature-flags.config';
import { getSoundById, type SoundDefinition } from '@/config/sound-system.config';

interface SoundInstance {
  id: string;
  howl: any; // Howler.Howl
}

interface UseSoundManagerReturn {
  playSound: (soundId: string, volumeOverride?: number) => void;
  stopSound: (soundId: string) => void;
  stopAll: () => void;
  setMasterVolume: (volume: number) => void;
  masterVolume: number;
  isMuted: boolean;
  toggleMute: () => void;
  soundsEnabled: boolean;
  preloadSounds: (soundIds: string[]) => void;
}

const VOLUME_STORAGE_KEY = 'cheers_master_volume';
const MUTE_STORAGE_KEY = 'cheers_muted';

export function useSoundManager(): UseSoundManagerReturn {
  const soundInstances = useRef<Map<string, SoundInstance>>(new Map());
  const [masterVolume, setMasterVolumeState] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const soundsEnabled = getFeatureFlag('sounds');

  // Load persisted preferences
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
    const savedMute = localStorage.getItem(MUTE_STORAGE_KEY);
    if (savedVolume) setMasterVolumeState(parseFloat(savedVolume));
    if (savedMute) setIsMuted(savedMute === 'true');
  }, []);

  const getOrCreateHowl = useCallback((sound: SoundDefinition): any | null => {
    if (typeof window === 'undefined') return null;
    
    const existing = soundInstances.current.get(sound.id);
    if (existing) return existing.howl;

    // Dynamically import Howler to avoid SSR issues
    try {
      const { Howl } = require('howler');
      const howl = new Howl({
        src: [sound.path],
        volume: sound.defaultVolume * masterVolume,
        preload: true,
        onloaderror: (_id: number, err: string) => {
          console.warn(`[SoundManager] Failed to load sound "${sound.id}":`, err);
        },
      });
      soundInstances.current.set(sound.id, { id: sound.id, howl });
      return howl;
    } catch (err) {
      console.warn('[SoundManager] Howler not available:', err);
      return null;
    }
  }, [masterVolume]);

  const playSound = useCallback((soundId: string, volumeOverride?: number) => {
    if (!soundsEnabled || isMuted) return;

    const soundDef = getSoundById(soundId);
    if (!soundDef) {
      console.warn(`[SoundManager] Unknown sound ID: "${soundId}"`);
      return;
    }

    const howl = getOrCreateHowl(soundDef);
    if (!howl) return;

    const targetVolume = (volumeOverride ?? soundDef.defaultVolume) * masterVolume;
    howl.volume(targetVolume);
    howl.play();
  }, [soundsEnabled, isMuted, masterVolume, getOrCreateHowl]);

  const stopSound = useCallback((soundId: string) => {
    const instance = soundInstances.current.get(soundId);
    if (instance) instance.howl.stop();
  }, []);

  const stopAll = useCallback(() => {
    soundInstances.current.forEach(instance => instance.howl.stop());
  }, []);

  const setMasterVolume = useCallback((volume: number) => {
    const clamped = Math.max(0, Math.min(1, volume));
    setMasterVolumeState(clamped);
    localStorage.setItem(VOLUME_STORAGE_KEY, String(clamped));
    // Update all existing Howl instances
    soundInstances.current.forEach(instance => {
      instance.howl.volume(clamped);
    });
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem(MUTE_STORAGE_KEY, String(newMuted));
  }, [isMuted]);

  const preloadSounds = useCallback((soundIds: string[]) => {
    soundIds.forEach(id => {
      const soundDef = getSoundById(id);
      if (soundDef) getOrCreateHowl(soundDef);
    });
  }, [getOrCreateHowl]);

  return {
    playSound,
    stopSound,
    stopAll,
    setMasterVolume,
    masterVolume,
    isMuted,
    toggleMute,
    soundsEnabled,
    preloadSounds,
  };
}
