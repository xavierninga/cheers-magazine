/**
 * pages/reader/index.tsx — Cheers Magazine Reader
 * =================================================
 * Main magazine reader with cinematic page flip,
 * sound effects, fullscreen, zoom, and anti-piracy.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useImmersiveFullscreenReader } from '@/hooks/use-immersive-fullscreen-reader';
import { useSoundManager } from '@/hooks/use-sound-manager';
import { useAntiPiracyWatermark } from '@/hooks/use-anti-piracy-watermark';
import { getFeatureFlag } from '@/config/feature-flags.config';

// Mock pages for demo (replace with real PDF-extracted images)
const DEMO_PAGES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  label: `Page ${i + 1}`,
  // Color shifts simulate real magazine pages
  bg: i === 0
    ? 'linear-gradient(135deg, #0A0A0A 0%, #1a0000 100%)'
    : i % 3 === 0
    ? 'linear-gradient(135deg, #0A0A0A, #111)'
    : 'linear-gradient(135deg, #141414, #0A0A0A)',
}));

export default function ReaderPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [zoom, setZoom] = useState(1);
  const [showThumbs, setShowThumbs] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);

  const { isFullscreen, toggle: toggleFullscreen } = useImmersiveFullscreenReader();
  const { playSound, masterVolume, setMasterVolume, isMuted, toggleMute } = useSoundManager();
  const { applyWatermark } = useAntiPiracyWatermark({ userId: 'demo-user', density: 'low' });

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current && getFeatureFlag('watermark')) {
      applyWatermark(pageRef.current);
    }
  }, [currentPage, applyWatermark]);

  const flipToPage = useCallback((targetPage: number, dir: 'next' | 'prev') => {
    if (isFlipping || targetPage < 0 || targetPage >= DEMO_PAGES.length) return;
    setFlipDirection(dir);
    setIsFlipping(true);
    playSound(dir === 'next' ? 'page-flip-soft' : 'page-flip-quick');
    setTimeout(() => {
      setCurrentPage(targetPage);
      setIsFlipping(false);
    }, 500);
  }, [isFlipping, playSound]);

  const handleNext = () => flipToPage(currentPage + 1, 'next');
  const handlePrev = () => flipToPage(currentPage - 1, 'prev');

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') handleNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') handlePrev();
      if (e.key === '+') setZoom(z => Math.min(z + 0.2, 3));
      if (e.key === '-') setZoom(z => Math.max(z - 0.2, 0.5));
      if (e.key === '0') setZoom(1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const page = DEMO_PAGES[currentPage];

  return (
    <>
      <Head>
        <title>Reader — Cheers Magazine</title>
      </Head>
      <div
        ref={readerRef}
        style={{
          minHeight: '100vh',
          background: '#0A0A0A',
          color: '#F5F5F0',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Barlow Condensed', sans-serif",
          userSelect: 'none',
        }}
      >
        {/* ---- TOP BAR ---- */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.8rem 1.5rem',
          background: '#111',
          borderBottom: '1px solid #2D2D2D',
          flexShrink: 0,
        }}>
          <Link href="/" style={{ color: '#F5F5F0', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.6 }}>
            ← Back
          </Link>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700 }}>
            CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
          </span>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5 }}>
            {currentPage + 1} / {DEMO_PAGES.length}
          </span>
        </div>

        {/* ---- READER AREA ---- */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Page */}
          <div
            ref={pageRef}
            style={{
              width: 'min(420px, 90vw)',
              aspectRatio: '3/4',
              background: page.bg,
              border: '1px solid #2D2D2D',
              borderRadius: 4,
              boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5)',
              transform: `
                scale(${zoom})
                ${isFlipping && flipDirection === 'next' ? 'rotateY(-90deg)' : ''}
                ${isFlipping && flipDirection === 'prev' ? 'rotateY(90deg)' : ''}
              `,
              transformOrigin: isFlipping
                ? (flipDirection === 'next' ? 'left center' : 'right center')
                : 'center center',
              transition: isFlipping
                ? 'transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
                : 'transform 0.3s ease',
              perspective: 2000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Page number display */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(4rem, 15vw, 8rem)',
              fontWeight: 900,
              color: 'rgba(200,16,46,0.15)',
              position: 'absolute',
              bottom: 20,
              right: 20,
              lineHeight: 1,
            }}>
              {String(currentPage + 1).padStart(2, '0')}
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.4em', color: '#C8102E', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Cheers Magazine
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, opacity: 0.8 }}>
                {page.label}
              </p>
              <p style={{ fontSize: '0.75rem', opacity: 0.35, marginTop: '0.5rem', letterSpacing: '0.1em' }}>
                Replace with PDF page content
              </p>
            </div>
          </div>

          {/* Prev / Next arrows */}
          {currentPage > 0 && (
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(200,16,46,0.15)', border: '1px solid rgba(200,16,46,0.4)',
                color: '#F5F5F0', width: 44, height: 44, borderRadius: '50%',
                cursor: 'pointer', fontSize: '1.2rem', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C8102E'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,16,46,0.15)'; }}
              aria-label="Previous page"
            >‹</button>
          )}
          {currentPage < DEMO_PAGES.length - 1 && (
            <button
              onClick={handleNext}
              style={{
                position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(200,16,46,0.15)', border: '1px solid rgba(200,16,46,0.4)',
                color: '#F5F5F0', width: 44, height: 44, borderRadius: '50%',
                cursor: 'pointer', fontSize: '1.2rem', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C8102E'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,16,46,0.15)'; }}
              aria-label="Next page"
            >›</button>
          )}
        </div>

        {/* ---- BOTTOM CONTROLS ---- */}
        <div style={{
          background: '#111',
          borderTop: '1px solid #2D2D2D',
          padding: '0.8rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          flexShrink: 0,
        }}>
          {/* Progress bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 120 }}>
            <div style={{
              flex: 1, height: 2, background: '#2D2D2D', borderRadius: 1, position: 'relative',
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, height: '100%',
                width: `${((currentPage + 1) / DEMO_PAGES.length) * 100}%`,
                background: '#C8102E',
                borderRadius: 1,
                transition: 'width 0.3s',
              }} />
            </div>
          </div>

          {/* Zoom controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} style={iconBtnStyle}>−</button>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', minWidth: 36, textAlign: 'center', opacity: 0.6 }}>
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} style={iconBtnStyle}>+</button>
          </div>

          {/* Sound mute */}
          <button onClick={toggleMute} style={iconBtnStyle} title={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted ? '🔇' : '🔊'}
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => toggleFullscreen(readerRef.current)}
            style={iconBtnStyle}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? '⊡' : '⛶'}
          </button>

          {/* Thumbnails */}
          <button
            onClick={() => setShowThumbs(v => !v)}
            style={{ ...iconBtnStyle, color: showThumbs ? '#C8102E' : '#F5F5F0' }}
            title="Toggle thumbnails"
          >
            ⊞
          </button>
        </div>

        {/* ---- THUMBNAIL STRIP ---- */}
        {showThumbs && (
          <div style={{
            background: '#0A0A0A',
            borderTop: '1px solid #2D2D2D',
            padding: '0.8rem 1rem',
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            flexShrink: 0,
          }}>
            {DEMO_PAGES.map((p, i) => (
              <button
                key={p.id}
                onClick={() => flipToPage(i, i > currentPage ? 'next' : 'prev')}
                style={{
                  width: 50,
                  aspectRatio: '3/4',
                  flexShrink: 0,
                  background: p.bg,
                  border: i === currentPage ? '2px solid #C8102E' : '1px solid #2D2D2D',
                  borderRadius: 2,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                  color: 'rgba(245,245,240,0.5)',
                  transition: 'border-color 0.2s',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const iconBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid #2D2D2D',
  color: '#F5F5F0',
  width: 32,
  height: 32,
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'border-color 0.2s',
};
