/**
 * src/components/ui/debug-overlay.tsx
 * ======================================
 * Floating debug overlay — FPS, events, loading states.
 * Only renders when debug mode is enabled.
 */

import React from 'react';
import type { DebugStats } from '@/hooks/use-debug-mode';

interface DebugOverlayProps {
  isEnabled: boolean;
  stats: DebugStats;
  onToggle: () => void;
  onReset: () => void;
}

export function DebugOverlay({ isEnabled, stats, onToggle, onReset }: DebugOverlayProps) {
  if (!isEnabled) {
    return (
      <button
        onClick={onToggle}
        title="Open Debug Panel"
        style={{
          position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9998,
          background: 'rgba(0,0,0,0.7)', border: '1px solid #C8102E',
          color: '#C8102E', width: 32, height: 32, borderRadius: 4,
          cursor: 'pointer', fontSize: '0.8rem', backdropFilter: 'blur(6px)',
        }}
      >🐛</button>
    );
  }

  const fpsColor = stats.fps > 50 ? '#4CAF50' : stats.fps > 30 ? '#FF9800' : '#C8102E';

  return (
    <div style={{
      position: 'fixed', top: '1rem', right: '1rem', zIndex: 9998,
      background: 'rgba(0,0,0,0.92)', border: '1px solid #C8102E',
      color: '#F5F5F0', padding: '0.8rem', borderRadius: 6,
      minWidth: 220, backdropFilter: 'blur(10px)',
      fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, borderBottom: '1px solid #2D2D2D', paddingBottom: 6 }}>
        <span style={{ color: '#C8102E', fontSize: '0.65rem', letterSpacing: '0.15em' }}>DEBUG MODE</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={onReset} style={{ background: 'none', border: 'none', color: 'rgba(245,245,240,0.4)', cursor: 'pointer', fontSize: '0.6rem' }}>RST</button>
          <button onClick={onToggle} style={{ background: 'none', border: 'none', color: 'rgba(245,245,240,0.4)', cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>
        </div>
      </div>

      {/* Stats */}
      {[
        { label: 'FPS', value: `${stats.fps}`, color: fpsColor },
        { label: 'Memory', value: stats.memoryMB ? `${stats.memoryMB} MB` : 'N/A' },
        { label: 'Renders', value: String(stats.renderCount) },
        { label: 'Page Trans.', value: String(stats.pageTransitions) },
        { label: 'Last Event', value: stats.lastEvent },
      ].map(row => (
        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
          <span style={{ opacity: 0.45 }}>{row.label}</span>
          <span style={{ color: row.color || '#F5F5F0', textAlign: 'right', maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.value}</span>
        </div>
      ))}

      {/* Sound triggers */}
      {stats.soundTriggers.length > 0 && (
        <div style={{ marginTop: 8, paddingTop: 6, borderTop: '1px solid #2D2D2D' }}>
          <p style={{ opacity: 0.45, marginBottom: 4, fontSize: '0.6rem' }}>SOUND TRIGGERS</p>
          {stats.soundTriggers.slice(0, 4).map((s, i) => (
            <div key={i} style={{ opacity: 0.5 - i * 0.1, marginBottom: 2 }}>🔊 {s}</div>
          ))}
        </div>
      )}

      {/* Loading states */}
      {Object.keys(stats.loadingStates).length > 0 && (
        <div style={{ marginTop: 8, paddingTop: 6, borderTop: '1px solid #2D2D2D' }}>
          <p style={{ opacity: 0.45, marginBottom: 4, fontSize: '0.6rem' }}>LOADING STATES</p>
          {Object.entries(stats.loadingStates).map(([key, loading]) => (
            <div key={key} style={{ display: 'flex', gap: 6, marginBottom: 2 }}>
              <span style={{ color: loading ? '#FF9800' : '#4CAF50' }}>{loading ? '⏳' : '✓'}</span>
              <span style={{ opacity: 0.6 }}>{key}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
