/**
 * src/components/ui/feature-flags-panel.tsx
 * ===========================================
 * Floating feature flags panel for rapid in-app toggling.
 * Used during dev/staging — hidden in production.
 */

import React, { useState, useEffect } from 'react';
import { featureFlags, getFeatureFlag, setFeatureFlag, resetAllFeatureFlags, type FeatureFlags } from '@/config/feature-flags.config';

const FLAG_LABELS: Record<keyof FeatureFlags, string> = {
  sounds:     '🔊 Sounds',
  animations: '🎬 Animations',
  antiPiracy: '🛡️ Anti-Piracy',
  watermark:  '💧 Watermark',
  fullscreen: '⛶ Fullscreen',
  debugMode:  '🐛 Debug Mode',
  payments:   '💳 Payments',
};

interface FeatureFlagsPanelProps {
  /** Only show in development by default */
  alwaysShow?: boolean;
}

export function FeatureFlagsPanel({ alwaysShow = false }: FeatureFlagsPanelProps) {
  const [open, setOpen] = useState(false);
  const [flags, setFlags] = useState<FeatureFlags>({ ...featureFlags });

  const isDev = process.env.NEXT_PUBLIC_APP_ENV !== 'production';
  if (!isDev && !alwaysShow) return null;

  useEffect(() => {
    const current = {} as FeatureFlags;
    (Object.keys(featureFlags) as (keyof FeatureFlags)[]).forEach(k => {
      current[k] = getFeatureFlag(k);
    });
    setFlags(current);
  }, []);

  const toggle = (key: keyof FeatureFlags) => {
    const val = !flags[key];
    setFeatureFlag(key, val);
    setFlags(prev => ({ ...prev, [key]: val }));
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed', bottom: '1rem', left: '1rem', zIndex: 9997,
          background: open ? '#C8102E' : 'rgba(0,0,0,0.8)',
          border: '1px solid #C8102E', color: '#F5F5F0',
          padding: '4px 10px', borderRadius: 4, cursor: 'pointer',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
          letterSpacing: '0.1em', backdropFilter: 'blur(6px)',
          transition: 'background 0.2s',
        }}
      >
        🚩 FLAGS
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '3.5rem', left: '1rem', zIndex: 9997,
          background: 'rgba(10,10,10,0.96)', border: '1px solid #C8102E',
          borderRadius: 6, padding: '0.8rem', minWidth: 200,
          backdropFilter: 'blur(10px)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid #2D2D2D' }}>
            <span style={{ color: '#C8102E', fontSize: '0.62rem', letterSpacing: '0.15em' }}>FEATURE FLAGS</span>
            <button onClick={() => { resetAllFeatureFlags(); setFlags({ ...featureFlags }); }}
              style={{ background: 'none', border: 'none', color: 'rgba(245,245,240,0.4)', cursor: 'pointer', fontSize: '0.6rem' }}>
              RESET
            </button>
          </div>
          {(Object.keys(FLAG_LABELS) as (keyof FeatureFlags)[]).map(key => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.68rem', opacity: 0.7 }}>{FLAG_LABELS[key]}</span>
              <button
                onClick={() => toggle(key)}
                style={{
                  width: 36, height: 20, borderRadius: 10,
                  background: flags[key] ? '#4CAF50' : '#2D2D2D',
                  border: 'none', cursor: 'pointer', position: 'relative',
                  transition: 'background 0.2s', flexShrink: 0,
                }}
              >
                <span style={{
                  position: 'absolute', top: 2, left: flags[key] ? 17 : 2,
                  width: 16, height: 16, borderRadius: '50%', background: 'white',
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
