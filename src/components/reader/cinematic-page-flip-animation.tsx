/**
 * src/components/reader/cinematic-page-flip-animation.tsx
 * =========================================================
 * Standalone page flip animation wrapper.
 * Handles the 3D flip with curl shadow and perspective.
 */

import React from 'react';

interface CinematicPageFlipAnimationProps {
  children: React.ReactNode;
  isFlipping: boolean;
  direction: 'next' | 'prev';
  duration?: number;
  showCurlShadow?: boolean;
  zoom?: number;
}

export function CinematicPageFlipAnimation({
  children,
  isFlipping,
  direction,
  duration = 600,
  showCurlShadow = true,
  zoom = 1,
}: CinematicPageFlipAnimationProps) {
  const origin = isFlipping
    ? direction === 'next' ? 'left center' : 'right center'
    : 'center center';

  const rotate = isFlipping
    ? direction === 'next' ? 'rotateY(-90deg)' : 'rotateY(90deg)'
    : 'rotateY(0deg)';

  const shadow = showCurlShadow && !isFlipping
    ? '0 30px 80px rgba(0,0,0,0.8), 8px 0 20px rgba(0,0,0,0.3) inset, -8px 0 20px rgba(0,0,0,0.2) inset'
    : '0 20px 60px rgba(0,0,0,0.6)';

  return (
    <div
      style={{
        transform: `scale(${zoom}) ${rotate}`,
        transformOrigin: origin,
        transition: isFlipping
          ? `transform ${duration}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`
          : 'transform 0.3s ease',
        boxShadow: shadow,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
