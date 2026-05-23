/**
 * pages/dev-testing/ui-showcase.tsx
 * =====================================
 * 🎨 UI Showcase — All components, typography, colors, icons in one place.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const COLORS = [
  { name: 'Brand Black', hex: '#0A0A0A', var: '--color-black' },
  { name: 'Brand Red', hex: '#C8102E', var: '--color-red' },
  { name: 'Red Dark', hex: '#8B0000', var: '--color-red-dark' },
  { name: 'Red Light', hex: '#FF1744', var: '--color-red-light' },
  { name: 'Off White', hex: '#F5F5F0', var: '--color-white' },
  { name: 'Gray', hex: '#1A1A1A', var: '--color-gray' },
  { name: 'Gray Mid', hex: '#2D2D2D', var: '--color-gray-mid' },
  { name: 'Gray Light', hex: '#6B6B6B', var: '--color-gray-light' },
];

export default function UIShowcasePage() {
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <>
      <Head><title>🎨 UI Showcase — Cheers Dev Testing</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>

        <div style={{ background: '#111', borderBottom: '1px solid #C8102E', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dev-testing" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>← Dev Hub</Link>
          <span style={{ color: '#2D2D2D' }}>|</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>🎨 UI Showcase</h1>
        </div>

        {/* Toast */}
        {toastVisible && (
          <div style={{ position: 'fixed', top: '5rem', right: '2rem', background: '#4CAF50', color: 'white', padding: '0.8rem 1.5rem', borderRadius: 6, zIndex: 9999, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', boxShadow: '0 8px 30px rgba(0,0,0,0.5)', animation: 'slideUp 0.3s ease' }}>
            ✅ Toast notification works!
          </div>
        )}

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>

          {/* Color System */}
          <Section title="Color System">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
              {COLORS.map(c => (
                <div key={c.hex}>
                  <div style={{ height: 70, background: c.hex, borderRadius: 4, border: '1px solid #2D2D2D', marginBottom: 6 }} />
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: 2 }}>{c.name}</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', opacity: 0.5 }}>{c.hex}</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', opacity: 0.3 }}>{c.var}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Typography */}
          <Section title="Typography Scale">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { label: 'Display / Playfair Display', font: "'Playfair Display', serif", size: '3rem', weight: 900, sample: 'Cheers Magazine' },
                { label: 'Display Italic', font: "'Playfair Display', serif", size: '2.5rem', weight: 700, style: 'italic', sample: 'Premium Edition' },
                { label: 'Heading 1 / Barlow Condensed 700', font: "'Barlow Condensed', sans-serif", size: '2rem', weight: 700, sample: 'HEADLINE TEXT' },
                { label: 'Heading 2', font: "'Barlow Condensed', sans-serif", size: '1.4rem', weight: 600, sample: 'Section Heading' },
                { label: 'Body / Barlow Condensed 400', font: "'Barlow Condensed', sans-serif", size: '1rem', weight: 400, sample: 'Body text for articles and descriptions.' },
                { label: 'Caption', font: "'Barlow Condensed', sans-serif", size: '0.8rem', weight: 400, sample: 'Small caption or label text' },
                { label: 'Mono / JetBrains Mono', font: "'JetBrains Mono', monospace", size: '0.85rem', weight: 400, sample: 'const reader = new MagazineReader();' },
              ].map(t => (
                <div key={t.label} style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '1rem' }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', opacity: 0.35, marginBottom: 6 }}>{t.label}</p>
                  <p style={{ fontFamily: t.font, fontSize: t.size, fontWeight: t.weight, fontStyle: (t as any).style || 'normal', lineHeight: 1.2 }}>
                    {t.sample}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Buttons */}
          <Section title="Button Components">
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button style={{ padding: '0.7rem 1.8rem', background: '#C8102E', border: 'none', color: 'white', borderRadius: 2, cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>Primary</button>
              <button style={{ padding: '0.7rem 1.8rem', background: 'transparent', border: '1px solid #C8102E', color: '#C8102E', borderRadius: 2, cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>Outline</button>
              <button style={{ padding: '0.7rem 1.8rem', background: '#1A1A1A', border: '1px solid #2D2D2D', color: '#F5F5F0', borderRadius: 2, cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>Secondary</button>
              <button style={{ padding: '0.7rem 1.8rem', background: 'transparent', border: 'none', color: 'rgba(245,245,240,0.5)', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>Ghost</button>
              <button onClick={showToast} style={{ padding: '0.7rem 1.8rem', background: '#4CAF50', border: 'none', color: 'white', borderRadius: 2, cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>Toast Demo</button>
            </div>
          </Section>

          {/* Badges / Tags */}
          <Section title="Badges & Tags">
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {[
                { label: 'NEW', bg: '#C8102E', color: 'white' },
                { label: 'EXCLUSIVE', bg: 'rgba(200,16,46,0.15)', color: '#C8102E', border: '1px solid rgba(200,16,46,0.4)' },
                { label: 'PREMIUM', bg: '#1a1000', color: '#FFD700', border: '1px solid rgba(255,215,0,0.3)' },
                { label: 'DEV', bg: '#1A1A1A', color: '#4CAF50', border: '1px solid rgba(76,175,80,0.4)' },
                { label: 'COMING SOON', bg: '#1A1A1A', color: 'rgba(245,245,240,0.4)', border: '1px solid #2D2D2D' },
              ].map(b => (
                <span key={b.label} style={{ padding: '3px 10px', background: b.bg, color: b.color, border: (b as any).border || 'none', borderRadius: 2, fontSize: '0.65rem', letterSpacing: '0.2em', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>
                  {b.label}
                </span>
              ))}
            </div>
          </Section>

          {/* Cards */}
          <Section title="Card Components">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {['Default', 'Hover (hover me)', 'Active'].map((label, i) => (
                <div key={label}
                  style={{ background: i === 2 ? 'rgba(200,16,46,0.08)' : '#1A1A1A', border: `1px solid ${i === 2 ? '#C8102E' : '#2D2D2D'}`, borderRadius: 6, padding: '1.2rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8102E'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = i === 2 ? '#C8102E' : '#2D2D2D'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 6 }}>{label}</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.5, lineHeight: 1.5 }}>Card body text with a brief description goes here.</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Form Elements */}
          <Section title="Form Elements">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
              <div>
                <label style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block', marginBottom: 4, letterSpacing: '0.1em' }}>TEXT INPUT</label>
                <input placeholder="Enter text..." style={{ width: '100%', background: '#1A1A1A', border: '1px solid #2D2D2D', color: '#F5F5F0', padding: '0.6rem 0.8rem', borderRadius: 4, fontSize: '0.9rem', fontFamily: "'Barlow Condensed', sans-serif", outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#C8102E'}
                  onBlur={e => e.target.style.borderColor = '#2D2D2D'} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block', marginBottom: 4, letterSpacing: '0.1em' }}>SELECT</label>
                <select style={{ width: '100%', background: '#1A1A1A', border: '1px solid #2D2D2D', color: '#F5F5F0', padding: '0.6rem 0.8rem', borderRadius: 4, fontSize: '0.9rem', fontFamily: "'Barlow Condensed', sans-serif" }}>
                  <option>Option One</option>
                  <option>Option Two</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block', marginBottom: 4, letterSpacing: '0.1em' }}>RANGE SLIDER</label>
                <input type="range" min={0} max={100} defaultValue={60} style={{ width: '100%', accentColor: '#C8102E' }} />
              </div>
            </div>
          </Section>

          {/* Loading States */}
          <Section title="Loading States">
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ width: 200, height: 24, background: 'linear-gradient(90deg, #1A1A1A 25%, #2D2D2D 50%, #1A1A1A 75%)', backgroundSize: '200% 100%', borderRadius: 4, animation: 'shimmer 1.8s linear infinite' }} />
              <div style={{ width: 120, height: 120, background: 'linear-gradient(90deg, #1A1A1A 25%, #2D2D2D 50%, #1A1A1A 75%)', backgroundSize: '200% 100%', borderRadius: 6, animation: 'shimmer 1.8s linear infinite' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[160, 120, 80].map(w => (
                  <div key={w} style={{ width: w, height: 12, background: 'linear-gradient(90deg, #1A1A1A 25%, #2D2D2D 50%, #1A1A1A 75%)', backgroundSize: '200% 100%', borderRadius: 2, animation: 'shimmer 1.8s linear infinite' }} />
                ))}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', marginBottom: '1.5rem', paddingBottom: '0.8rem', borderBottom: '1px solid #2D2D2D', letterSpacing: '0.02em' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
