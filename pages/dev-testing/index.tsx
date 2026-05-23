/**
 * pages/dev-testing/index.tsx
 * ============================
 * 🛠 Developer Testing Hub — Central access to all test modules.
 * Only accessible in development/staging environments.
 */

import Head from 'next/head';
import Link from 'next/link';

const TEST_MODULES = [
  {
    id: 'sound-lab',
    label: '🎵 Sound Lab',
    description: 'Test every sound effect, adjust volume, preview animation + sound sync',
    href: '/dev-testing/sound-lab',
    status: 'ready',
  },
  {
    id: 'reader-tests',
    label: '📖 Reader Playground',
    description: 'Test page flip speed, animation, zoom, fullscreen, swipe, drag',
    href: '/dev-testing/reader-tests',
    status: 'ready',
  },
  {
    id: 'motion-tests',
    label: '🎬 Motion Tests',
    description: 'Animation playground — test every transition and micro-interaction',
    href: '/dev-testing/motion-tests',
    status: 'ready',
  },
  {
    id: 'pdf-upload',
    label: '📄 PDF Upload',
    description: 'Drag & drop PDF, extract pages, view conversion logs, compression stats',
    href: '/dev-testing/pdf-upload',
    status: 'ready',
  },
  {
    id: 'security-tests',
    label: '🔒 Security Tests',
    description: 'Anti-piracy overlay, watermark system, right-click protection',
    href: '/dev-testing/security-tests',
    status: 'ready',
  },
  {
    id: 'ui-showcase',
    label: '🎨 UI Showcase',
    description: 'All UI components, typography scale, color system, icons',
    href: '/dev-testing/ui-showcase',
    status: 'ready',
  },
  {
    id: 'feature-flags',
    label: '🚩 Feature Flags',
    description: 'Toggle all feature flags — sounds, animations, anti-piracy, debug mode',
    href: '/dev-testing/feature-flags',
    status: 'ready',
  },
  {
    id: 'debug-panel',
    label: '🐛 Debug Panel',
    description: 'FPS monitor, memory usage, loading states, render inspector',
    href: '/dev-testing/debug-panel',
    status: 'ready',
  },
  {
    id: 'payment-sim',
    label: '💳 Payment Simulation',
    description: 'Simulate payment flows, success, failure, and webhook events',
    href: '/dev-testing/payment-sim',
    status: 'coming-soon',
  },
];

export default function DevTestingHub() {
  return (
    <>
      <Head><title>🛠 Dev Testing Hub — Cheers Magazine</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>

        {/* Header */}
        <div style={{ background: '#111', borderBottom: '2px solid #C8102E', padding: '1.5rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1000, margin: '0 auto' }}>
            <div>
              <Link href="/" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>← Back to App</Link>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700 }}>
                🛠 Developer Testing Hub
              </h1>
              <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: 6, letterSpacing: '0.05em' }}>
                Cheers Magazine · Local / Staging Environment
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#C8102E', background: '#1A0000', padding: '6px 12px', borderRadius: 4, border: '1px solid rgba(200,16,46,0.3)' }}>
                ENV: {process.env.NEXT_PUBLIC_APP_ENV || 'development'}
              </div>
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2.5rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
            {TEST_MODULES.map(module => (
              <Link
                key={module.id}
                href={module.status === 'ready' ? module.href : '#'}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    background: '#1A1A1A',
                    border: '1px solid #2D2D2D',
                    borderRadius: 6,
                    padding: '1.4rem',
                    cursor: module.status === 'ready' ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    opacity: module.status === 'ready' ? 1 : 0.5,
                    height: '100%',
                  }}
                  onMouseEnter={e => {
                    if (module.status === 'ready') {
                      e.currentTarget.style.borderColor = '#C8102E';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#2D2D2D';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                      {module.label}
                    </h2>
                    {module.status === 'coming-soon' && (
                      <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', background: '#2D2D2D', color: 'rgba(245,245,240,0.5)', padding: '2px 6px', borderRadius: 2 }}>
                        SOON
                      </span>
                    )}
                    {module.status === 'ready' && (
                      <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', background: 'rgba(76,175,80,0.1)', color: '#4CAF50', padding: '2px 6px', borderRadius: 2, border: '1px solid rgba(76,175,80,0.3)' }}>
                        READY
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.82rem', opacity: 0.55, lineHeight: 1.5, letterSpacing: '0.02em' }}>
                    {module.description}
                  </p>
                  {module.status === 'ready' && (
                    <p style={{ marginTop: 12, fontSize: '0.75rem', color: '#C8102E', letterSpacing: '0.1em' }}>
                      Open →
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
