/**
 * use-anti-piracy-watermark.ts
 * =============================
 * Dynamic invisible + visible watermark system.
 * Embeds user identity into each page view to deter/trace piracy.
 */

import { useCallback, useEffect, useRef } from 'react';
import { getFeatureFlag } from '@/config/feature-flags.config';

interface WatermarkOptions {
  userId?: string;
  userEmail?: string;
  opacity?: number;
  fontSize?: number;
  color?: string;
  rotation?: number;
  density?: 'low' | 'medium' | 'high';
}

const DENSITY_GAP: Record<string, number> = {
  low: 300,
  medium: 200,
  high: 120,
};

export function useAntiPiracyWatermark(options: WatermarkOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const featureEnabled = getFeatureFlag('watermark');

  const {
    userId = 'reader',
    userEmail = '',
    opacity = 0.06,
    fontSize = 13,
    color = '#C8102E',
    rotation = -35,
    density = 'medium',
  } = options;

  const generateWatermarkCanvas = useCallback((): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px Georgia, serif`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    const timestamp = new Date().toLocaleDateString();
    const lines = [
      'CHEERS MAGAZINE',
      userEmail || userId,
      timestamp,
    ];

    lines.forEach((line, i) => {
      ctx.fillText(line, -ctx.measureText(line).width / 2, (i - 1) * (fontSize + 4));
    });

    return canvas.toDataURL('image/png');
  }, [userId, userEmail, opacity, fontSize, color, rotation]);

  const applyWatermark = useCallback((target: HTMLElement) => {
    if (!featureEnabled) return;

    const dataUrl = generateWatermarkCanvas();
    const gap = DENSITY_GAP[density];

    // Apply as repeating background pattern
    target.style.backgroundImage = `url(${dataUrl})`;
    target.style.backgroundRepeat = 'repeat';
    target.style.backgroundSize = `${gap}px`;
    target.style.backgroundPosition = '0 0';
  }, [featureEnabled, generateWatermarkCanvas, density]);

  const removeWatermark = useCallback((target: HTMLElement) => {
    target.style.backgroundImage = '';
    target.style.backgroundRepeat = '';
    target.style.backgroundSize = '';
  }, []);

  // Invisible forensic watermark (embeds in metadata)
  const getForensicString = useCallback((): string => {
    const timestamp = Date.now();
    const data = `${userId}|${userEmail}|${timestamp}`;
    return btoa(data);
  }, [userId, userEmail]);

  return {
    containerRef,
    canvasRef,
    applyWatermark,
    removeWatermark,
    getForensicString,
    isEnabled: featureEnabled,
  };
}
