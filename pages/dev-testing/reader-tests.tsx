/**
 * pages/dev-testing/reader-tests.tsx
 * =====================================
 * 📖 Reader Playground — Test page flip, zoom, swipe, FPS, and all reader features.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from 'react';

const FLIP_SPEEDS = [200, 400, 600, 800, 1200];
const FLIP_EASINGS = [
  { label: 'Linear', value: 'linear' },
  { label: 'Ease-In-Out', value: 'ease-in-out' },
  { label: 'Cubic Bezier (Magazine)', value: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)' },
  { label: 'Spring', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { label: 'Bounce', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
];

const COLORS = [
  'linear-gradient(135deg, #0A0A0A, #1a0000)',
  'linear-gradient(135deg, #0A1A0A, #0a0f0a)',
  'linear-gradient(135deg, #0A0A1A, #0a0a1f)',
  'linear-gradient(135deg, #1a1000, #0A0A0A)',
  'linear-gradient(135deg, #111, #222)',
];

export default function ReaderTestsPage() {
  const [flipSpeed, setFlipSpeed] = useState(600);
  const [flipEasing, setFlipEasing] = useState(FLIP_EASINGS[2].value);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<'left' | 'right'>('left');
  const [zoom, setZoom] = useState(1);
  const [flipCount, setFlipCount] = useState(0);
  const [fps, setFps] = useState(0);
  const [autoFlip, setAutoFlip] = useState(false);
  const [curl, setCurl] = useState(false);
  const frameRef = useRef<number>(0);
  const lastRef = useRef(performance.now());
  const fCountRef = useRef(0);
  const autoRef = useRef<ReturnType<typeof setInterval>>();

  const PAGES = 10;

  // FPS counter
  useEffect(() => {
    const tick = (now: number) => {
      fCountRef.current++;
      const d = now - lastRef.current;
      if (d >= 1000) {
        setFps(Math.round((fCountRef.current * 1000) / d));
        fCountRef.current = 0;
        lastRef.current = now;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // Auto flip
  useEffect(() => {
    if (autoFlip) {
      autoRef.current = setInterval(() => {
        flip('left');
      }, flipSpeed + 500);
    } else {
      clearInterval(autoRef.current);
    }
    return () => clearInterval(autoRef.current);
  }, [autoFlip, flipSpeed]);

  const flip = useCallback((dir: 'left' | 'right') => {
    if (isFlipping) return;
    const nextPage = dir === 'left'
      ? (currentPage + 1) % PAGES
      : (currentPage - 1 + PAGES) % PAGES;
    setFlipDir(dir);
    setIsFlipping(true);
    setFlipCount(c => c + 1);
    setTimeout(() => {
      setCurrentPage(nextPage);
      setIsFlipping(false);
    }, flipSpeed);
  }, [isFlipping, currentPage, flipSpeed]);

  return (
    <>
      <Head><title>📖 Reader Playground — Cheers Dev Testing</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>

        <div style={{ background: '#111', borderBottom: '1px solid #C8102E', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dev-testing" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>← Dev Hub</Link>
          <span style={{ color: '#2D2D2D' }}>|</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>📖 Reader Playground</h1>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>

          {/* Controls Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Stats */}
            <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '0.8rem' }}>LIVE STATS</p>
              {[
                { label: 'FPS', value: `${fps}`, color: fps > 50 ? '#4CAF50' : fps > 30 ? '#FF9800' : '#C8102E' },
                { label: 'Page', value: `${currentPage + 1} / ${PAGES}` },
                { label: 'Flip Count', value: String(flipCount) },
                { label: 'Zoom', value: `${Math.round(zoom * 100)}%` },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{s.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: s.color || '#F5F5F0' }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Flip Speed */}
            <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '0.8rem' }}>FLIP SPEED</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {FLIP_SPEEDS.map(s => (
                  <button key={s} onClick={() => setFlipSpeed(s)}
                    style={{ padding: '4px 10px', background: flipSpeed === s ? '#C8102E' : 'transparent', border: `1px solid ${flipSpeed === s ? '#C8102E' : '#2D2D2D'}`, color: '#F5F5F0', borderRadius: 4, cursor: 'pointer', fontSize: '0.75rem' }}>
                    {s}ms
                  </button>
                ))}
              </div>
            </div>

            {/* Easing */}
            <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '0.8rem' }}>EASING</p>
              {FLIP_EASINGS.map(e => (
                <button key={e.value} onClick={() => setFlipEasing(e.value)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '5px 8px', background: flipEasing === e.value ? 'rgba(200,16,46,0.1)' : 'transparent', border: `1px solid ${flipEasing === e.value ? '#C8102E' : 'transparent'}`, color: flipEasing === e.value ? '#F5F5F0' : 'rgba(245,245,240,0.5)', borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem', marginBottom: 3 }}>
                  {e.label}
                </button>
              ))}
            </div>

            {/* Options */}
            <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '0.8rem' }}>OPTIONS</p>
              {[
                { label: 'Auto Flip', value: autoFlip, set: setAutoFlip },
                { label: 'Page Curl Shadow', value: curl, set: setCurl },
              ].map(opt => (
                <div key={opt.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.85rem' }}>{opt.label}</span>
                  <button onClick={() => opt.set((v: boolean) => !v)}
                    style={{ width: 42, height: 23, borderRadius: 12, background: opt.value ? '#4CAF50' : '#2D2D2D', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                    <span style={{ position: 'absolute', top: 2, left: opt.value ? 20 : 2, width: 19, height: 19, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                  </button>
                </div>
              ))}

              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem' }}>Zoom</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#C8102E' }}>{Math.round(zoom * 100)}%</span>
                </div>
                <input type="range" min={0.5} max={2.5} step={0.1} value={zoom}
                  onChange={e => setZoom(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#C8102E', marginTop: 6 }} />
              </div>
            </div>
          </div>

          {/* Reader Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ flex: 1, background: '#111', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 480, position: 'relative', overflow: 'hidden' }}>
              {/* Page */}
              <div style={{
                width: 'min(300px, 80%)',
                aspectRatio: '3/4',
                background: COLORS[currentPage % COLORS.length],
                border: '1px solid #2D2D2D',
                borderRadius: 4,
                boxShadow: curl
                  ? '0 20px 60px rgba(0,0,0,0.8), 8px 8px 20px rgba(0,0,0,0.5), inset -4px 0 8px rgba(0,0,0,0.3)'
                  : '0 20px 60px rgba(0,0,0,0.6)',
                transform: `scale(${zoom}) ${isFlipping ? (flipDir === 'left' ? 'rotateY(-90deg)' : 'rotateY(90deg)') : 'rotateY(0deg)'}`,
                transformOrigin: isFlipping ? (flipDir === 'left' ? 'left center' : 'right center') : 'center',
                transition: isFlipping ? `transform ${flipSpeed}ms ${flipEasing}` : 'transform 0.3s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                perspective: 2000,
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '4rem', fontWeight: 900, color: 'rgba(200,16,46,0.2)' }}>
                    {String(currentPage + 1).padStart(2, '0')}
                  </div>
                  <p style={{ fontSize: '0.7rem', opacity: 0.3, letterSpacing: '0.2em' }}>TEST PAGE</p>
                </div>
              </div>

              {/* Flip buttons */}
              <button onClick={() => flip('right')} disabled={isFlipping}
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(200,16,46,0.15)', border: '1px solid rgba(200,16,46,0.4)', color: '#F5F5F0', fontSize: '1.2rem', cursor: 'pointer' }}>
                ‹
              </button>
              <button onClick={() => flip('left')} disabled={isFlipping}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(200,16,46,0.15)', border: '1px solid rgba(200,16,46,0.4)', color: '#F5F5F0', fontSize: '1.2rem', cursor: 'pointer' }}>
                ›
              </button>
            </div>

            {/* Keyboard hint */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {['← Previous', '→ Next', '+ Zoom In', '- Zoom Out', '0 Reset Zoom'].map(hint => (
                <span key={hint} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', opacity: 0.35 }}>{hint}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
