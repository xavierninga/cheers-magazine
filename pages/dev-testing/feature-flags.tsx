/**
 * pages/dev-testing/feature-flags.tsx
 * =====================================
 * 🚩 Feature Flags Panel — Toggle all features in real-time.
 * Overrides persist in sessionStorage until tab is closed.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { featureFlags, getFeatureFlag, setFeatureFlag, resetAllFeatureFlags, type FeatureFlags } from '@/config/feature-flags.config';

const FLAG_META: Record<keyof FeatureFlags, { label: string; description: string; emoji: string }> = {
  sounds:     { label: 'Sound Effects', description: 'Page flip, click, hover, and notification sounds', emoji: '🔊' },
  animations: { label: 'Animations', description: 'Page flip animations, transitions, micro-interactions', emoji: '🎬' },
  antiPiracy: { label: 'Anti-Piracy Overlay', description: 'Screen capture protection and copy prevention', emoji: '🛡️' },
  watermark:  { label: 'User Watermark', description: 'Invisible + visible user identity watermarks on pages', emoji: '💧' },
  fullscreen: { label: 'Fullscreen Mode', description: 'Immersive fullscreen reader mode toggle', emoji: '⛶' },
  debugMode:  { label: 'Debug Mode', description: 'FPS counter, render inspector, event log overlay', emoji: '🐛' },
  payments:   { label: 'Payment Flows', description: 'Subscription and per-issue payment UI', emoji: '💳' },
};

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlags>({ ...featureFlags });

  useEffect(() => {
    // Read current runtime values (includes sessionStorage overrides)
    const current: FeatureFlags = {} as FeatureFlags;
    (Object.keys(featureFlags) as (keyof FeatureFlags)[]).forEach(key => {
      current[key] = getFeatureFlag(key);
    });
    setFlags(current);
  }, []);

  const toggle = (key: keyof FeatureFlags) => {
    const newVal = !flags[key];
    setFeatureFlag(key, newVal);
    setFlags(prev => ({ ...prev, [key]: newVal }));
  };

  const resetAll = () => {
    resetAllFeatureFlags();
    setFlags({ ...featureFlags });
  };

  return (
    <>
      <Head><title>🚩 Feature Flags — Cheers Dev Testing</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>

        <div style={{ background: '#111', borderBottom: '1px solid #C8102E', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/dev-testing" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>← Dev Hub</Link>
            <span style={{ color: '#2D2D2D' }}>|</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>🚩 Feature Flags</h1>
          </div>
          <button
            onClick={resetAll}
            style={{ padding: '0.4rem 1rem', background: 'transparent', border: '1px solid #C8102E', color: '#C8102E', borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.1em' }}
          >
            Reset All
          </button>
        </div>

        <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
          <div style={{ background: '#1A0000', border: '1px solid rgba(200,16,46,0.2)', borderRadius: 6, padding: '1rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: 1.6 }}>
              <strong style={{ color: '#C8102E' }}>ℹ️ Info:</strong> Overrides are stored in <code style={{ fontFamily: 'monospace' }}>sessionStorage</code> and reset when the tab is closed.
              To change defaults permanently, edit <code style={{ fontFamily: 'monospace' }}>.env.local</code>.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {(Object.keys(FLAG_META) as (keyof FeatureFlags)[]).map(key => {
              const meta = FLAG_META[key];
              const isOn = flags[key];
              const envDefault = featureFlags[key];
              const overridden = isOn !== envDefault;

              return (
                <div
                  key={key}
                  style={{
                    background: '#1A1A1A',
                    border: `1px solid ${isOn ? 'rgba(76,175,80,0.3)' : '#2D2D2D'}`,
                    borderRadius: 6,
                    padding: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: '1.1rem' }}>{meta.emoji}</span>
                      <span style={{ fontWeight: 600, fontSize: '1rem' }}>{meta.label}</span>
                      {overridden && (
                        <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', background: '#1A0000', color: '#C8102E', padding: '1px 6px', borderRadius: 2, border: '1px solid rgba(200,16,46,0.3)' }}>
                          OVERRIDDEN
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.02em' }}>{meta.description}</p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'rgba(245,245,240,0.3)', marginTop: 4 }}>
                      env default: {String(envDefault)} · current: {String(isOn)}
                    </p>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => toggle(key)}
                    style={{
                      width: 52,
                      height: 28,
                      borderRadius: 14,
                      background: isOn ? '#4CAF50' : '#2D2D2D',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      flexShrink: 0,
                      transition: 'background 0.2s',
                    }}
                    aria-label={`Toggle ${meta.label}`}
                  >
                    <span style={{
                      position: 'absolute',
                      top: 3,
                      left: isOn ? 26 : 3,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'white',
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    }} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
