/**
 * pages/issues/index.tsx — All Issues
 */

import Head from 'next/head';
import Link from 'next/link';

const ISSUES = [
  { number: '001', title: 'Premier Issue', date: 'May 2026', description: 'The inaugural edition of Cheers Magazine — lifestyle, culture, entertainment.', available: true },
  { number: '002', title: 'Summer Edition', date: 'June 2026', description: 'Summer special — travel, fashion, and outdoor living.', available: false },
  { number: '003', title: 'Culture & Arts', date: 'July 2026', description: 'Deep dive into Cameroonian art, music, and cultural heritage.', available: false },
  { number: '004', title: 'Business & Lifestyle', date: 'August 2026', description: 'Entrepreneurship, success stories, and luxury lifestyle.', available: false },
];

export default function IssuesPage() {
  return (
    <>
      <Head><title>All Issues — Cheers Magazine</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>

        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1A1A1A', padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#F5F5F0', textDecoration: 'none' }}>
            CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
          </Link>
          <Link href="/" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>← Home</Link>
        </nav>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ color: '#C8102E', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 8 }}>Archive</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900 }}>All Issues</h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
            {ISSUES.map(issue => (
              <div key={issue.number}
                style={{ background: '#1A1A1A', border: `1px solid ${issue.available ? '#2D2D2D' : '#1A1A1A'}`, borderRadius: 4, overflow: 'hidden', opacity: issue.available ? 1 : 0.6, transition: 'all 0.2s' }}
                onMouseEnter={e => { if (issue.available) { e.currentTarget.style.borderColor = '#C8102E'; e.currentTarget.style.transform = 'translateY(-3px)'; } }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = issue.available ? '#2D2D2D' : '#1A1A1A'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ aspectRatio: '3/4', background: `linear-gradient(135deg, #1a0000 0%, #${issue.number === '001' ? '1a0000' : '0a0a1a'} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '5rem', fontWeight: 900, color: 'rgba(200,16,46,0.25)' }}>#{issue.number}</div>
                  {!issue.available && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)' }}>
                      <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', background: '#2D2D2D', padding: '4px 12px', borderRadius: 2 }}>Coming Soon</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: '1rem' }}>
                  <p style={{ color: '#C8102E', fontSize: '0.65rem', letterSpacing: '0.3em', marginBottom: 4 }}>Vol. {issue.number} · {issue.date}</p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', marginBottom: 6 }}>{issue.title}</h3>
                  <p style={{ fontSize: '0.78rem', opacity: 0.45, lineHeight: 1.5, marginBottom: '0.8rem' }}>{issue.description}</p>
                  {issue.available && (
                    <Link href="/reader" style={{ display: 'block', textAlign: 'center', padding: '0.5rem', background: 'transparent', border: '1px solid rgba(200,16,46,0.4)', color: '#C8102E', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 2, transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#C8102E'; e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C8102E'; }}>
                      Read Now
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
