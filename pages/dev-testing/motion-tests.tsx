/**
 * pages/dev-testing/motion-tests.tsx
 * =====================================
 * 🎬 Motion Tests — Animation playground for every transition and micro-interaction.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef } from 'react';

const TRANSITIONS = [
  { id: 'fade', label: 'Fade In/Out', css: 'opacity 0.5s ease-in-out' },
  { id: 'slide-up', label: 'Slide Up', css: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' },
  { id: 'scale', label: 'Scale Pop', css: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' },
  { id: 'flip-x', label: 'Flip X (Page)', css: 'transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1.000)' },
  { id: 'blur-in', label: 'Blur Reveal', css: 'filter 0.5s ease, opacity 0.5s ease' },
  { id: 'wipe', label: 'Wipe Right', css: 'clip-path 0.5s ease-in-out' },
];

const MICRO_INTERACTIONS = [
  { id: 'button-press', label: 'Button Press Scale' },
  { id: 'hover-lift', label: 'Card Hover Lift' },
  { id: 'ripple', label: 'Ripple Click' },
  { id: 'shake', label: 'Error Shake' },
  { id: 'pulse', label: 'Attention Pulse' },
];

export default function MotionTestsPage() {
  const [activeTransition, setActiveTransition] = useState<string | null>(null);
  const [activeMicro, setActiveMicro] = useState<string | null>(null);
  const [running, setRunning] = useState<Record<string, boolean>>({});
  const [speed, setSpeed] = useState(1);

  const trigger = (id: string, duration = 800) => {
    setRunning(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setRunning(prev => ({ ...prev, [id]: false })), duration / speed);
  };

  const getBoxStyle = (id: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: 160,
      height: 100,
      background: 'linear-gradient(135deg, #1a0000, #2D2D2D)',
      border: '1px solid #2D2D2D',
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      opacity: 0.7,
    };
    const isActive = running[id];
    switch (id) {
      case 'fade':
        return { ...base, opacity: isActive ? 0 : 0.7, transition: `opacity ${0.5 / speed}s ease-in-out` };
      case 'slide-up':
        return { ...base, transform: isActive ? 'translateY(-20px)' : 'translateY(0)', transition: `transform ${0.5 / speed}s cubic-bezier(0.16, 1, 0.3, 1)` };
      case 'scale':
        return { ...base, transform: isActive ? 'scale(1.15)' : 'scale(1)', transition: `transform ${0.4 / speed}s cubic-bezier(0.34, 1.56, 0.64, 1)` };
      case 'flip-x':
        return { ...base, transform: isActive ? 'rotateY(180deg)' : 'rotateY(0deg)', transformOrigin: 'left center', transition: `transform ${0.6 / speed}s cubic-bezier(0.645, 0.045, 0.355, 1.000)` };
      case 'blur-in':
        return { ...base, filter: isActive ? 'blur(8px)' : 'blur(0)', opacity: isActive ? 0 : 0.7, transition: `filter ${0.5 / speed}s ease, opacity ${0.5 / speed}s ease` };
      default:
        return base;
    }
  };

  const getMicroStyle = (id: string): React.CSSProperties => {
    const isActive = running[id];
    const base: React.CSSProperties = {
      padding: '0.7rem 1.4rem',
      background: '#1A1A1A',
      border: '1px solid #2D2D2D',
      borderRadius: 6,
      color: '#F5F5F0',
      cursor: 'pointer',
      fontSize: '0.85rem',
      letterSpacing: '0.08em',
      userSelect: 'none',
    };
    switch (id) {
      case 'button-press':
        return { ...base, transform: isActive ? 'scale(0.93)' : 'scale(1)', transition: `transform ${0.15 / speed}s ease` };
      case 'hover-lift':
        return { ...base, transform: isActive ? 'translateY(-4px)' : 'translateY(0)', boxShadow: isActive ? '0 8px 30px rgba(200,16,46,0.3)' : 'none', transition: `all ${0.2 / speed}s ease`, borderColor: isActive ? '#C8102E' : '#2D2D2D' };
      case 'shake':
        return { ...base, animation: isActive ? `shake ${0.5 / speed}s ease` : 'none', borderColor: isActive ? '#C8102E' : '#2D2D2D' };
      case 'pulse':
        return { ...base, boxShadow: isActive ? '0 0 0 8px rgba(200,16,46,0)' : 'none', background: isActive ? 'rgba(200,16,46,0.15)' : '#1A1A1A', transition: `all ${0.4 / speed}s ease` };
      default:
        return base;
    }
  };

  return (
    <>
      <Head><title>🎬 Motion Tests — Cheers Dev Testing</title></Head>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes ripple-effect {
          0% { transform: scale(0); opacity: 0.6; }
          100% { transform: scale(4); opacity: 0; }
        }
      `}</style>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>

        <div style={{ background: '#111', borderBottom: '1px solid #C8102E', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dev-testing" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>← Dev Hub</Link>
          <span style={{ color: '#2D2D2D' }}>|</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>🎬 Motion Tests</h1>
        </div>

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>

          {/* Speed Control */}
          <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Animation Speed:</span>
            {[0.5, 1, 1.5, 2, 3].map(s => (
              <button key={s} onClick={() => setSpeed(s)}
                style={{ padding: '4px 12px', background: speed === s ? '#C8102E' : 'transparent', border: `1px solid ${speed === s ? '#C8102E' : '#2D2D2D'}`, color: '#F5F5F0', borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem' }}>
                {s}x
              </button>
            ))}
          </div>

          {/* Page Transitions */}
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid #2D2D2D', paddingBottom: '0.8rem' }}>
              Page Transitions
            </h2>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {TRANSITIONS.map(t => (
                <div key={t.id} style={{ textAlign: 'center' }}>
                  <div style={{ perspective: 800, marginBottom: 10 }}>
                    <div style={getBoxStyle(t.id)}>
                      <span style={{ letterSpacing: '0.1em', fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6 }}>Preview</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: 6 }}>{t.label}</p>
                  <button
                    onClick={() => trigger(t.id, 800)}
                    disabled={running[t.id]}
                    style={{ padding: '4px 14px', background: running[t.id] ? 'rgba(200,16,46,0.2)' : 'transparent', border: '1px solid rgba(200,16,46,0.4)', color: '#C8102E', borderRadius: 4, cursor: running[t.id] ? 'default' : 'pointer', fontSize: '0.75rem' }}>
                    {running[t.id] ? '▶ Running' : '▶ Play'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Micro-Interactions */}
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid #2D2D2D', paddingBottom: '0.8rem' }}>
              Micro-Interactions
            </h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {MICRO_INTERACTIONS.map(m => (
                <div key={m.id} style={{ position: 'relative', overflow: 'hidden', borderRadius: 6 }}>
                  <button
                    style={getMicroStyle(m.id)}
                    onClick={() => trigger(m.id, 600)}
                  >
                    {m.label}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Page Flip Demo */}
          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid #2D2D2D', paddingBottom: '0.8rem' }}>
              Magazine Page Flip (Full Demo)
            </h2>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {['soft', 'hard', 'spring', 'dramatic'].map(variant => {
                const easings: Record<string, string> = {
                  soft: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                  hard: 'linear',
                  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  dramatic: 'cubic-bezier(0.87, 0, 0.13, 1)',
                };
                const isRunning = running[`flip-${variant}`];
                return (
                  <div key={variant} style={{ textAlign: 'center' }}>
                    <div style={{ perspective: 1000, marginBottom: 10 }}>
                      <div style={{
                        width: 110, height: 150, background: 'linear-gradient(135deg, #1a0000, #111)',
                        border: '1px solid #2D2D2D', borderRadius: 3,
                        transform: isRunning ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                        transformOrigin: 'left center',
                        transition: `transform ${0.7 / speed}s ${easings[variant]}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', color: '#C8102E', letterSpacing: '0.1em', textTransform: 'uppercase',
                      }}>
                        Page
                      </div>
                    </div>
                    <p style={{ fontSize: '0.75rem', textTransform: 'capitalize', opacity: 0.6, marginBottom: 6 }}>{variant}</p>
                    <button onClick={() => trigger(`flip-${variant}`, 900)}
                      disabled={isRunning}
                      style={{ padding: '4px 12px', background: isRunning ? 'rgba(200,16,46,0.2)' : 'transparent', border: '1px solid rgba(200,16,46,0.4)', color: '#C8102E', borderRadius: 4, cursor: 'pointer', fontSize: '0.7rem' }}>
                      {isRunning ? '...' : 'Flip'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
