/**
 * pages/dev-testing/security-tests.tsx
 * =======================================
 * 🔒 Security Tests — Anti-piracy overlay, watermark, right-click protection.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAntiPiracyWatermark } from '@/hooks/use-anti-piracy-watermark';
import { getFeatureFlag, setFeatureFlag } from '@/config/feature-flags.config';

export default function SecurityTestsPage() {
  const [watermarkEnabled, setWatermarkEnabled] = useState(getFeatureFlag('watermark'));
  const [antiPiracyEnabled, setAntiPiracyEnabled] = useState(getFeatureFlag('antiPiracy'));
  const [rightClickBlocked, setRightClickBlocked] = useState(false);
  const [userId, setUserId] = useState('test-user-001');
  const [userEmail, setUserEmail] = useState('reader@cheers.com');
  const [density, setDensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [opacity, setOpacity] = useState(0.06);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const testPageRef = useRef<HTMLDivElement>(null);
  const { applyWatermark, removeWatermark, getForensicString } = useAntiPiracyWatermark({
    userId, userEmail, density, opacity,
  });

  useEffect(() => {
    if (testPageRef.current) {
      if (watermarkEnabled) {
        applyWatermark(testPageRef.current);
        log('✅ Watermark applied');
      } else {
        removeWatermark(testPageRef.current);
        log('❌ Watermark removed');
      }
    }
  }, [watermarkEnabled, userId, userEmail, density, opacity, applyWatermark, removeWatermark]);

  useEffect(() => {
    if (!rightClickBlocked) return;
    const handler = (e: MouseEvent) => {
      e.preventDefault();
      log('🚫 Right-click blocked');
    };
    document.addEventListener('contextmenu', handler);
    return () => document.removeEventListener('contextmenu', handler);
  }, [rightClickBlocked]);

  const log = (msg: string) => {
    setEventLog(prev => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 19)]);
  };

  const toggleWatermark = () => {
    const val = !watermarkEnabled;
    setWatermarkEnabled(val);
    setFeatureFlag('watermark', val);
  };

  const toggleAntiPiracy = () => {
    const val = !antiPiracyEnabled;
    setAntiPiracyEnabled(val);
    setFeatureFlag('antiPiracy', val);
  };

  return (
    <>
      <Head><title>🔒 Security Tests — Cheers Dev Testing</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>

        <div style={{ background: '#111', borderBottom: '1px solid #C8102E', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dev-testing" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>← Dev Hub</Link>
          <span style={{ color: '#2D2D2D' }}>|</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>🔒 Security Tests</h1>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

            {/* Toggle Panel */}
            <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1.2rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '1rem' }}>SECURITY TOGGLES</p>
              {[
                { label: '💧 User Watermark', value: watermarkEnabled, toggle: toggleWatermark },
                { label: '🛡️ Anti-Piracy Overlay', value: antiPiracyEnabled, toggle: toggleAntiPiracy },
                { label: '🚫 Block Right-Click', value: rightClickBlocked, toggle: () => setRightClickBlocked(v => !v) },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                  <button
                    onClick={item.toggle}
                    style={{
                      width: 48, height: 26, borderRadius: 13,
                      background: item.value ? '#4CAF50' : '#2D2D2D',
                      border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
                    }}
                  >
                    <span style={{
                      position: 'absolute', top: 3, left: item.value ? 23 : 3,
                      width: 20, height: 20, borderRadius: '50%', background: 'white',
                      transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    }} />
                  </button>
                </div>
              ))}
            </div>

            {/* Watermark Config */}
            <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1.2rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '1rem' }}>WATERMARK CONFIG</p>
              {[
                { label: 'User ID', value: userId, onChange: setUserId },
                { label: 'User Email', value: userEmail, onChange: setUserEmail },
              ].map(field => (
                <div key={field.label} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block', marginBottom: 4 }}>{field.label}</label>
                  <input
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    style={{ width: '100%', background: '#2D2D2D', border: '1px solid #3D3D3D', color: '#F5F5F0', padding: '0.4rem 0.6rem', borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block', marginBottom: 4 }}>Density</label>
                <select value={density} onChange={e => setDensity(e.target.value as any)}
                  style={{ width: '100%', background: '#2D2D2D', border: '1px solid #3D3D3D', color: '#F5F5F0', padding: '0.4rem', borderRadius: 4 }}>
                  {['low', 'medium', 'high'].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontSize: '0.75rem', opacity: 0.5 }}>Opacity</label>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#C8102E' }}>{opacity.toFixed(2)}</span>
                </div>
                <input type="range" min={0.01} max={0.2} step={0.01} value={opacity}
                  onChange={e => setOpacity(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#C8102E' }} />
              </div>
            </div>

            {/* Forensic String */}
            <div style={{ background: '#1A0000', border: '1px solid rgba(200,16,46,0.2)', borderRadius: 6, padding: '1rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: 6 }}>FORENSIC STRING (Base64)</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', opacity: 0.5, wordBreak: 'break-all', lineHeight: 1.4 }}>
                {getForensicString()}
              </p>
            </div>
          </div>

          {/* RIGHT: Preview + Event Log */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Mock Page Preview */}
            <div
              ref={testPageRef}
              style={{
                background: 'linear-gradient(135deg, #141414, #0A0A0A)',
                border: '1px solid #2D2D2D',
                borderRadius: 6,
                aspectRatio: '3/4',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                userSelect: 'none',
              }}
            >
              {antiPiracyEnabled && (
                <div style={{
                  position: 'absolute', inset: 0, background: 'transparent',
                  zIndex: 10, cursor: 'default',
                }} />
              )}
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', opacity: 0.6, zIndex: 1 }}>Mock Magazine Page</p>
              <p style={{ fontSize: '0.7rem', opacity: 0.3, marginTop: 6, letterSpacing: '0.1em', zIndex: 1 }}>Watermark test area</p>
            </div>

            {/* Event Log */}
            <div style={{ background: '#0A0A0A', border: '1px solid #2D2D2D', borderRadius: 6, overflow: 'hidden', flex: 1 }}>
              <div style={{ padding: '0.6rem 1rem', borderBottom: '1px solid #2D2D2D' }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E' }}>EVENT LOG</span>
              </div>
              <div style={{ padding: '0.8rem', maxHeight: 200, overflowY: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem' }}>
                {eventLog.length === 0 ? (
                  <p style={{ opacity: 0.3 }}>No events yet</p>
                ) : eventLog.map((e, i) => (
                  <div key={i} style={{ opacity: 0.7, marginBottom: 3 }}>{e}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
