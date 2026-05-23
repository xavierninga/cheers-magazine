/**
 * pages/dev-testing/sound-lab.tsx
 * ================================
 * 🎵 SOUND LAB — Test every sound effect in isolation.
 * Adjust volume, preview synchronization, test mute behavior.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { SOUND_REGISTRY, SOUND_CATEGORIES, getSoundsByCategory, type SoundCategory } from '@/config/sound-system.config';
import { useSoundManager } from '@/hooks/use-sound-manager';

export default function SoundLabPage() {
  const [activeCategory, setActiveCategory] = useState<SoundCategory | 'all'>('all');
  const [lastPlayed, setLastPlayed] = useState<string>('—');
  const [playing, setPlaying] = useState<string | null>(null);

  const {
    playSound,
    masterVolume,
    setMasterVolume,
    isMuted,
    toggleMute,
    soundsEnabled,
  } = useSoundManager();

  const handlePlay = useCallback((soundId: string) => {
    playSound(soundId);
    setLastPlayed(soundId);
    setPlaying(soundId);
    setTimeout(() => setPlaying(null), 1200);
  }, [playSound]);

  const displaySounds = activeCategory === 'all'
    ? SOUND_REGISTRY
    : getSoundsByCategory(activeCategory);

  return (
    <>
      <Head><title>🎵 Sound Lab — Cheers Dev Testing</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>

        {/* Header */}
        <div style={{ background: '#111', borderBottom: '1px solid #C8102E', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/dev-testing" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>← Dev Hub</Link>
            <span style={{ color: '#2D2D2D' }}>|</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>
              🎵 Sound Lab
            </h1>
          </div>
          <div className="dev-badge" style={{ position: 'static', fontSize: '0.65rem', background: '#C8102E', color: 'white', padding: '3px 10px', borderRadius: 4, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace" }}>
            DEV TESTING
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>

          {/* Status Panel */}
          <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1.2rem', marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <StatRow label="Sounds Enabled" value={soundsEnabled ? '✅ YES' : '❌ NO'} color={soundsEnabled ? '#4CAF50' : '#C8102E'} />
            <StatRow label="Muted" value={isMuted ? '🔇 YES' : '🔊 NO'} color={isMuted ? '#C8102E' : '#4CAF50'} />
            <StatRow label="Master Volume" value={`${Math.round(masterVolume * 100)}%`} color="#F5F5F0" />
            <StatRow label="Last Played" value={lastPlayed} color="#C8102E" />
          </div>

          {/* Controls */}
          <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8102E', marginBottom: '1.2rem' }}>Master Controls</h2>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.6 }}>Volume:</span>
                <input
                  type="range" min={0} max={1} step={0.05}
                  value={masterVolume}
                  onChange={e => setMasterVolume(parseFloat(e.target.value))}
                  style={{ width: 160, accentColor: '#C8102E' }}
                />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#C8102E', minWidth: 36 }}>
                  {Math.round(masterVolume * 100)}%
                </span>
              </div>
              <button
                onClick={toggleMute}
                style={{
                  padding: '0.5rem 1.2rem',
                  background: isMuted ? '#C8102E' : 'transparent',
                  border: '1px solid #C8102E',
                  color: '#F5F5F0',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  transition: 'background 0.2s',
                }}
              >
                {isMuted ? '🔇 Unmute' : '🔊 Mute All'}
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {(['all', ...SOUND_CATEGORIES] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.4rem 1rem',
                  background: activeCategory === cat ? '#C8102E' : 'transparent',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? '#C8102E' : '#2D2D2D',
                  color: '#F5F5F0',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sound Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {displaySounds.map(sound => (
              <div
                key={sound.id}
                style={{
                  background: playing === sound.id ? 'rgba(200,16,46,0.1)' : '#1A1A1A',
                  border: `1px solid ${playing === sound.id ? '#C8102E' : '#2D2D2D'}`,
                  borderRadius: 6,
                  padding: '1.2rem',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#C8102E', letterSpacing: '0.1em', marginBottom: 4 }}>
                      [{sound.category}]
                    </p>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.05em' }}>{sound.label}</p>
                    <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: 4, lineHeight: 1.4 }}>{sound.description}</p>
                  </div>
                  {playing === sound.id && (
                    <span style={{ fontSize: '1.2rem', animation: 'pulse 0.5s infinite' }}>🔊</span>
                  )}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: 'rgba(245,245,240,0.3)', marginBottom: 12 }}>
                  {sound.path}
                </div>
                <button
                  onClick={() => handlePlay(sound.id)}
                  disabled={!soundsEnabled || isMuted}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: playing === sound.id ? '#C8102E' : 'transparent',
                    border: '1px solid',
                    borderColor: playing === sound.id ? '#C8102E' : 'rgba(200,16,46,0.4)',
                    color: '#F5F5F0',
                    borderRadius: 4,
                    cursor: soundsEnabled && !isMuted ? 'pointer' : 'not-allowed',
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    opacity: soundsEnabled && !isMuted ? 1 : 0.4,
                    transition: 'all 0.15s',
                  }}
                >
                  {playing === sound.id ? '▶ Playing...' : '▶ Play'}
                </button>
              </div>
            ))}
          </div>

          {/* Note */}
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#1A0000', border: '1px solid rgba(200,16,46,0.2)', borderRadius: 6 }}>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.05em', color: 'rgba(245,245,240,0.5)', lineHeight: 1.6 }}>
              <strong style={{ color: '#C8102E' }}>📌 Note:</strong> Sound files must exist at <code style={{ fontFamily: 'monospace', color: '#C8102E' }}>/public/sounds/&lt;category&gt;/&lt;filename&gt;.mp3</code>.
              Until real files are added, sounds will attempt to load and fail silently. Add your MP3s to the appropriate folder and they will play automatically.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function StatRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 4 }}>{label}</p>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', color, fontWeight: 600 }}>{value}</p>
    </div>
  );
}
