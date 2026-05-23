/**
 * pages/dev-testing/debug-panel.tsx
 * ===================================
 * 🐛 Debug Panel — FPS, memory, loading states, render inspector.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function DebugPanelPage() {
  const [fps, setFps] = useState(0);
  const [memMB, setMemMB] = useState<number | null>(null);
  const [renderCount, setRenderCount] = useState(0);
  const [events, setEvents] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    'Page Assets': false,
    'PDF Worker': false,
    'Sound System': false,
    'Image Preloader': false,
  });
  const frameRef = useRef<number>(0);
  const lastRef = useRef(performance.now());
  const fRef = useRef(0);

  // FPS + Memory
  useEffect(() => {
    const tick = (now: number) => {
      fRef.current++;
      const d = now - lastRef.current;
      if (d >= 1000) {
        setFps(Math.round((fRef.current * 1000) / d));
        fRef.current = 0;
        lastRef.current = now;
        if ('memory' in performance) {
          setMemMB(Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024));
        }
        setRenderCount(c => c + 1);
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const log = (msg: string) => {
    const t = new Date().toLocaleTimeString();
    setEvents(prev => [`${t} — ${msg}`, ...prev.slice(0, 29)]);
  };

  const simulateLoad = (key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    log(`[LOADING] ${key} started`);
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
      log(`[LOADED] ${key} complete`);
    }, 1500 + Math.random() * 1000);
  };

  const fpsColor = fps > 50 ? '#4CAF50' : fps > 30 ? '#FF9800' : '#C8102E';

  return (
    <>
      <Head><title>🐛 Debug Panel — Cheers Dev Testing</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'JetBrains Mono', monospace" }}>

        <div style={{ background: '#111', borderBottom: '1px solid #C8102E', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Barlow Condensed', sans-serif" }}>
          <Link href="/dev-testing" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>← Dev Hub</Link>
          <span style={{ color: '#2D2D2D' }}>|</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>🐛 Debug Panel</h1>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

          {/* Performance Metrics */}
          <div style={{ background: '#111', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1.2rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '1rem', fontFamily: "'Barlow Condensed', sans-serif" }}>PERFORMANCE METRICS</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'FPS', value: fps, unit: '', color: fpsColor, big: true },
                { label: 'Memory', value: memMB ?? 'N/A', unit: memMB ? ' MB' : '', color: '#F5F5F0', big: true },
                { label: 'Renders', value: renderCount, unit: '', color: '#F5F5F0' },
                { label: 'Uptime', value: Math.round(performance.now() / 1000), unit: 's', color: '#F5F5F0' },
              ].map(m => (
                <div key={m.label} style={{ background: '#1A1A1A', borderRadius: 4, padding: '0.8rem' }}>
                  <p style={{ fontSize: '0.6rem', opacity: 0.4, marginBottom: 4 }}>{m.label}</p>
                  <p style={{ fontSize: m.big ? '1.8rem' : '1.2rem', fontWeight: 700, color: m.color, lineHeight: 1 }}>
                    {m.value}{m.unit}
                  </p>
                </div>
              ))}
            </div>

            {/* FPS Bar */}
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '0.6rem', opacity: 0.4, marginBottom: 4 }}>FPS GAUGE (60 target)</p>
              <div style={{ height: 6, background: '#2D2D2D', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${Math.min((fps / 60) * 100, 100)}%`, background: fpsColor, borderRadius: 3, transition: 'width 0.5s, background 0.5s' }} />
              </div>
            </div>
          </div>

          {/* Loading States */}
          <div style={{ background: '#111', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1.2rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '1rem', fontFamily: "'Barlow Condensed', sans-serif" }}>LOADING STATE SIMULATOR</p>
            {Object.entries(loadingStates).map(([key, loading]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: loading ? '#FF9800' : '#4CAF50', flexShrink: 0, boxShadow: loading ? '0 0 6px #FF9800' : '0 0 6px #4CAF50' }} />
                <span style={{ flex: 1, fontSize: '0.75rem', opacity: 0.7 }}>{key}</span>
                <span style={{ fontSize: '0.65rem', color: loading ? '#FF9800' : '#4CAF50' }}>{loading ? 'LOADING' : 'READY'}</span>
                <button
                  onClick={() => simulateLoad(key)}
                  disabled={loading}
                  style={{ padding: '2px 8px', background: loading ? '#2D2D2D' : 'rgba(200,16,46,0.1)', border: `1px solid ${loading ? '#2D2D2D' : 'rgba(200,16,46,0.4)'}`, color: '#C8102E', borderRadius: 3, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.65rem', opacity: loading ? 0.4 : 1 }}>
                  SIM
                </button>
              </div>
            ))}
          </div>

          {/* Event Log */}
          <div style={{ gridColumn: '1 / -1', background: '#0A0A0A', border: '1px solid #2D2D2D', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ padding: '0.7rem 1rem', borderBottom: '1px solid #2D2D2D', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C8102E', fontFamily: "'Barlow Condensed', sans-serif" }}>DEBUG EVENT STREAM</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => log('Manual ping event')} style={{ padding: '2px 10px', background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.4)', color: '#C8102E', borderRadius: 3, cursor: 'pointer', fontSize: '0.65rem' }}>
                  PING
                </button>
                <button onClick={() => setEvents([])} style={{ padding: '2px 10px', background: 'transparent', border: '1px solid #2D2D2D', color: 'rgba(245,245,240,0.3)', borderRadius: 3, cursor: 'pointer', fontSize: '0.65rem' }}>
                  CLEAR
                </button>
              </div>
            </div>
            <div style={{ padding: '0.8rem', height: 240, overflowY: 'auto', fontSize: '0.7rem' }}>
              {events.length === 0 ? (
                <p style={{ opacity: 0.3, fontFamily: "'Barlow Condensed', sans-serif" }}>Waiting for events... Use the buttons above to simulate loading.</p>
              ) : events.map((e, i) => (
                <div key={i} style={{ marginBottom: 3, opacity: 0.8, color: e.includes('LOADED') ? '#4CAF50' : e.includes('LOADING') ? '#FF9800' : 'rgba(245,245,240,0.7)' }}>
                  {e}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
