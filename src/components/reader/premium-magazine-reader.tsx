/**
 * src/components/reader/premium-magazine-reader.tsx
 * ===================================================
 * Core reusable magazine reader component.
 * Handles page flip, zoom, gestures, fullscreen, and sound triggers.
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useImmersiveFullscreenReader } from '@/hooks/use-immersive-fullscreen-reader';
import { useSoundManager } from '@/hooks/use-sound-manager';
import { useAntiPiracyWatermark } from '@/hooks/use-anti-piracy-watermark';

export interface MagazinePage {
  id: number;
  imageUrl: string;
  alt?: string;
}

interface PremiumMagazineReaderProps {
  pages: MagazinePage[];
  title?: string;
  userId?: string;
  userEmail?: string;
  onPageChange?: (page: number) => void;
}

export function PremiumMagazineReader({
  pages,
  title = 'Cheers Magazine',
  userId,
  userEmail,
  onPageChange,
}: PremiumMagazineReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<'next' | 'prev'>('next');
  const [zoom, setZoom] = useState(1);
  const [showThumbs, setShowThumbs] = useState(false);
  const [isLoaded, setIsLoaded] = useState<Record<number, boolean>>({});
  const readerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  const { isFullscreen, toggle: toggleFullscreen } = useImmersiveFullscreenReader();
  const { playSound, isMuted, toggleMute } = useSoundManager();
  const { applyWatermark } = useAntiPiracyWatermark({ userId, userEmail, density: 'low' });

  // Apply watermark on page change
  useEffect(() => {
    if (pageRef.current) applyWatermark(pageRef.current);
  }, [currentPage, applyWatermark]);

  // Preload adjacent pages
  useEffect(() => {
    const toPreload = [currentPage - 1, currentPage, currentPage + 1].filter(
      p => p >= 0 && p < pages.length
    );
    toPreload.forEach(p => {
      if (!isLoaded[p] && pages[p]?.imageUrl) {
        const img = new Image();
        img.src = pages[p].imageUrl;
        img.onload = () => setIsLoaded(prev => ({ ...prev, [p]: true }));
      }
    });
  }, [currentPage, pages, isLoaded]);

  const flipTo = useCallback((target: number, dir: 'next' | 'prev') => {
    if (isFlipping || target < 0 || target >= pages.length) return;
    setFlipDir(dir);
    setIsFlipping(true);
    playSound(dir === 'next' ? 'page-flip-soft' : 'page-flip-quick');
    setTimeout(() => {
      setCurrentPage(target);
      setIsFlipping(false);
      onPageChange?.(target);
    }, 550);
  }, [isFlipping, pages.length, playSound, onPageChange]);

  const handleNext = useCallback(() => flipTo(currentPage + 1, 'next'), [currentPage, flipTo]);
  const handlePrev = useCallback(() => flipTo(currentPage - 1, 'prev'), [currentPage, flipTo]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); handleNext(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); handlePrev(); }
      if (e.key === '+') setZoom(z => Math.min(z + 0.2, 3));
      if (e.key === '-') setZoom(z => Math.max(z - 0.2, 0.5));
      if (e.key === '0') setZoom(1);
      if (e.key === 'f' || e.key === 'F') toggleFullscreen(readerRef.current);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleNext, handlePrev, toggleFullscreen]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? handleNext() : handlePrev(); }
  };

  const page = pages[currentPage];
  const progress = ((currentPage + 1) / pages.length) * 100;

  return (
    <div
      ref={readerRef}
      style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#111', color: '#F5F5F0', userSelect: 'none', fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1.2rem', background: '#0A0A0A', borderBottom: '1px solid #1A1A1A', flexShrink: 0 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 700 }}>
          {title}
        </span>
        <span style={{ fontSize: '0.75rem', opacity: 0.4, fontFamily: "'JetBrains Mono', monospace" }}>
          {currentPage + 1} / {pages.length}
        </span>
      </div>

      {/* Reader Area */}
      <div
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '1.5rem' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Page Container */}
        <div
          ref={pageRef}
          style={{
            maxWidth: 480,
            width: '100%',
            aspectRatio: '3/4',
            position: 'relative',
            transform: `scale(${zoom}) ${isFlipping
              ? flipDir === 'next' ? 'rotateY(-90deg)' : 'rotateY(90deg)'
              : 'rotateY(0deg)'
            }`,
            transformOrigin: isFlipping
              ? flipDir === 'next' ? 'left center' : 'right center'
              : 'center',
            transition: isFlipping
              ? 'transform 0.55s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
              : 'transform 0.3s ease',
            boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5)',
            perspective: 2000,
            borderRadius: 2,
            overflow: 'hidden',
            background: '#1A1A1A',
          }}
        >
          {page?.imageUrl ? (
            <img
              src={page.imageUrl}
              alt={page.alt || `Page ${currentPage + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              draggable={false}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a0000, #111)' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '5rem', fontWeight: 900, color: 'rgba(200,16,46,0.2)' }}>
                {String(currentPage + 1).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Nav Arrows */}
        {currentPage > 0 && (
          <button onClick={handlePrev} aria-label="Previous page"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.35)', color: '#F5F5F0', cursor: 'pointer', fontSize: '1.4rem', transition: 'background 0.2s' }}>
            ‹
          </button>
        )}
        {currentPage < pages.length - 1 && (
          <button onClick={handleNext} aria-label="Next page"
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.35)', color: '#F5F5F0', cursor: 'pointer', fontSize: '1.4rem', transition: 'background 0.2s' }}>
            ›
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div style={{ height: 2, background: '#1A1A1A', flexShrink: 0 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: '#C8102E', transition: 'width 0.4s ease' }} />
      </div>

      {/* Bottom Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1.2rem', background: '#0A0A0A', borderTop: '1px solid #1A1A1A', flexShrink: 0, flexWrap: 'wrap' }}>
        {/* Page indicator */}
        <span style={{ fontSize: '0.75rem', opacity: 0.4, flex: 1 }}>
          {currentPage + 1} of {pages.length}
        </span>

        {/* Zoom */}
        <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} style={ctrlBtn}>−</button>
        <span style={{ fontSize: '0.7rem', opacity: 0.4, minWidth: 36, textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} style={ctrlBtn}>+</button>
        <button onClick={() => setZoom(1)} style={{ ...ctrlBtn, fontSize: '0.6rem' }}>RST</button>

        {/* Mute */}
        <button onClick={toggleMute} style={ctrlBtn} title={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? '🔇' : '🔊'}
        </button>

        {/* Fullscreen */}
        <button onClick={() => toggleFullscreen(readerRef.current)} style={ctrlBtn} title="Toggle fullscreen">
          {isFullscreen ? '⊡' : '⛶'}
        </button>

        {/* Thumbs */}
        <button onClick={() => setShowThumbs(v => !v)} style={{ ...ctrlBtn, color: showThumbs ? '#C8102E' : '#F5F5F0' }}>⊞</button>
      </div>

      {/* Thumbnail Strip */}
      {showThumbs && (
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '0.6rem 1rem', background: '#0A0A0A', borderTop: '1px solid #1A1A1A', flexShrink: 0 }}>
          {pages.map((p, i) => (
            <button key={p.id} onClick={() => flipTo(i, i > currentPage ? 'next' : 'prev')}
              style={{ flexShrink: 0, width: 44, aspectRatio: '3/4', background: '#1A1A1A', border: `${i === currentPage ? 2 : 1}px solid ${i === currentPage ? '#C8102E' : '#2D2D2D'}`, borderRadius: 2, overflow: 'hidden', cursor: 'pointer', padding: 0 }}>
              {p.imageUrl
                ? <img src={p.imageUrl} alt={`Page ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: '0.6rem', color: 'rgba(245,245,240,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{i + 1}</span>
              }
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const ctrlBtn: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid #2D2D2D',
  color: '#F5F5F0',
  width: 30,
  height: 30,
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'border-color 0.2s',
  flexShrink: 0,
};
