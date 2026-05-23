/**
 * pages/about/index.tsx — About Cheers Magazine
 */

import Head from 'next/head';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Head><title>About — Cheers Magazine</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1A1A1A', padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#F5F5F0', textDecoration: 'none' }}>
            CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
          </Link>
          <Link href="/" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>← Home</Link>
        </nav>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '5rem 2rem' }}>
          <p style={{ color: '#C8102E', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>About Us</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem' }}>
            The Voice of<br /><span style={{ color: '#C8102E', fontStyle: 'italic' }}>Modern Culture</span>
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.05rem', lineHeight: 1.8, opacity: 0.75, letterSpacing: '0.02em' }}>
            <p>Cheers Magazine is a premium digital publication dedicated to celebrating lifestyle, culture, entertainment, and the people who shape them. Founded with a passion for great storytelling and beautiful design, we bring you curated content that inspires and informs.</p>
            <p>Our readers are discerning, ambitious, and culturally connected. We create for them — and with them — a magazine experience that feels as luxurious as the world it covers.</p>
            <p>Every issue is crafted with care: from the photography and editorial direction to the immersive digital reading experience that brings each page to life.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #1A1A1A' }}>
            {[
              { number: '10K+', label: 'Monthly Readers' },
              { number: '12', label: 'Issues Per Year' },
              { number: '100%', label: 'Digital-First' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 900, color: '#C8102E', lineHeight: 1 }}>{stat.number}</p>
                <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', opacity: 0.5, marginTop: 6, textTransform: 'uppercase' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem' }}>
            <Link href="/reader" style={{ padding: '0.9rem 2rem', background: '#C8102E', color: 'white', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 2 }}>
              Read Latest Issue
            </Link>
            <Link href="/subscribe" style={{ padding: '0.9rem 2rem', border: '1px solid rgba(245,245,240,0.2)', color: '#F5F5F0', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 2 }}>
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
