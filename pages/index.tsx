/**
 * index.tsx — Cheers Magazine Homepage
 * =====================================
 * Premium magazine landing page with cinematic hero,
 * latest issue showcase, and reader call-to-action.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Cheers Magazine — Premium Digital Edition</title>
      </Head>

      <main
        style={{
          minHeight: '100vh',
          background: '#0A0A0A',
          color: '#F5F5F0',
          fontFamily: "'Barlow Condensed', sans-serif",
          overflowX: 'hidden',
        }}
      >
        {/* ======== NAV ======== */}
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.2rem 2.5rem',
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.95), transparent)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img
              src="/images/cheers-logo.png"
              alt="Cheers Magazine"
              style={{ height: 48, objectFit: 'contain' }}
              onError={(e) => {
                // Fallback if image not found
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#F5F5F0',
              letterSpacing: '0.05em',
            }}>
              CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {['Issues', 'About', 'Subscribe'].map(item => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                style={{
                  color: '#F5F5F0',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  opacity: 0.8,
                  transition: 'opacity 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = '#C8102E';
                  (e.target as HTMLElement).style.opacity = '1';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = '#F5F5F0';
                  (e.target as HTMLElement).style.opacity = '0.8';
                }}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/reader"
              style={{
                background: '#C8102E',
                color: 'white',
                padding: '0.5rem 1.2rem',
                borderRadius: 2,
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#FF1744')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C8102E')}
            >
              Read Now
            </Link>
          </div>
        </nav>

        {/* ======== HERO ======== */}
        <section
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'radial-gradient(ellipse at 60% 40%, #1a0000 0%, #0A0A0A 60%)',
            padding: '0 2rem',
          }}
        >
          {/* Red accent line */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: '30%',
            width: 4,
            height: '40%',
            background: 'linear-gradient(to bottom, transparent, #C8102E, transparent)',
          }} />

          <div
            style={{
              textAlign: 'center',
              maxWidth: 900,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#C8102E',
              marginBottom: '1.2rem',
            }}>
              Premium Digital Edition
            </p>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}>
              CHEERS
              <br />
              <span style={{ color: '#C8102E', fontStyle: 'italic' }}>Magazine</span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              letterSpacing: '0.05em',
              color: 'rgba(245,245,240,0.65)',
              maxWidth: 500,
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}>
              The definitive guide to lifestyle, culture, and entertainment.
              Beautifully crafted for the digital age.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/reader"
                style={{
                  background: '#C8102E',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  borderRadius: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FF1744';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#C8102E';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                ▶ Read Latest Issue
              </Link>
              <Link
                href="/issues"
                style={{
                  border: '1px solid rgba(245,245,240,0.3)',
                  color: '#F5F5F0',
                  padding: '1rem 2.5rem',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  borderRadius: 2,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#C8102E';
                  e.currentTarget.style.color = '#C8102E';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(245,245,240,0.3)';
                  e.currentTarget.style.color = '#F5F5F0';
                }}
              >
                Browse Issues
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            opacity: 0.5,
          }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, #C8102E, transparent)',
              animation: 'pulseHeight 2s ease-in-out infinite',
            }} />
          </div>
        </section>

        {/* ======== LATEST ISSUE SECTION ======== */}
        <section style={{
          padding: '8rem 2.5rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '4rem',
          }}>
            <div>
              <p style={{ color: '#C8102E', fontSize: '0.8rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Current Issue
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700 }}>
                Latest Edition
              </h2>
            </div>
            <Link href="/issues" style={{
              color: '#C8102E',
              textDecoration: 'none',
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: '0.5rem',
            }}>
              All Issues →
            </Link>
          </div>

          {/* Issue Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { number: '001', title: 'Premier Issue', date: 'May 2026', featured: true },
              { number: '002', title: 'Summer Edition', date: 'June 2026', featured: false },
              { number: '003', title: 'Special Feature', date: 'Coming Soon', featured: false },
            ].map(issue => (
              <div
                key={issue.number}
                style={{
                  background: '#1A1A1A',
                  border: issue.featured ? '1px solid #C8102E' : '1px solid #2D2D2D',
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, border-color 0.3s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#C8102E';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = issue.featured ? '#C8102E' : '#2D2D2D';
                }}
              >
                {issue.featured && (
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: '#C8102E',
                    color: 'white',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: 2,
                    zIndex: 2,
                  }}>
                    New
                  </div>
                )}
                {/* Cover placeholder */}
                <div style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  background: 'linear-gradient(135deg, #1a0000, #2D2D2D)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '4rem',
                    fontWeight: 900,
                    color: 'rgba(200,16,46,0.3)',
                    letterSpacing: '-0.05em',
                  }}>
                    #{issue.number}
                  </div>
                  {/* Bottom gradient */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, #1A1A1A, transparent)',
                  }} />
                </div>
                <div style={{ padding: '1.2rem' }}>
                  <p style={{ color: '#C8102E', fontSize: '0.7rem', letterSpacing: '0.3em', marginBottom: 4 }}>
                    Vol. {issue.number}
                  </p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', marginBottom: 6 }}>
                    {issue.title}
                  </h3>
                  <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                    {issue.date}
                  </p>
                  <Link
                    href="/reader"
                    style={{
                      display: 'block',
                      marginTop: '1rem',
                      textAlign: 'center',
                      padding: '0.6rem',
                      background: 'transparent',
                      border: '1px solid rgba(200,16,46,0.4)',
                      color: '#C8102E',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      borderRadius: 2,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#C8102E';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#C8102E';
                    }}
                  >
                    {issue.date === 'Coming Soon' ? 'Preview' : 'Read Now'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======== DEV TESTING BANNER (debug mode) ======== */}
        {process.env.NEXT_PUBLIC_APP_ENV !== 'production' && (
          <div style={{
            background: '#1A0000',
            borderTop: '1px solid #C8102E',
            borderBottom: '1px solid #C8102E',
            padding: '1rem 2.5rem',
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: '#C8102E',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              🛠 Dev Testing:
            </span>
            {[
              { label: 'Sound Lab', href: '/dev-testing/sound-lab' },
              { label: 'Reader Tests', href: '/dev-testing/reader-tests' },
              { label: 'Motion Tests', href: '/dev-testing/motion-tests' },
              { label: 'PDF Upload', href: '/dev-testing/pdf-upload' },
              { label: 'Security Tests', href: '/dev-testing/security-tests' },
              { label: 'UI Showcase', href: '/dev-testing/ui-showcase' },
              { label: 'Feature Flags', href: '/dev-testing/feature-flags' },
              { label: 'Debug Panel', href: '/dev-testing/debug-panel' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  color: 'rgba(245,245,240,0.7)',
                  textDecoration: 'none',
                  padding: '3px 8px',
                  border: '1px solid rgba(245,245,240,0.15)',
                  borderRadius: 2,
                  transition: 'all 0.15s',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#C8102E';
                  e.currentTarget.style.borderColor = '#C8102E';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(245,245,240,0.7)';
                  e.currentTarget.style.borderColor = 'rgba(245,245,240,0.15)';
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* ======== FOOTER ======== */}
        <footer style={{
          borderTop: '1px solid #1A1A1A',
          padding: '3rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.2rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}>
            CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
          </span>
          <p style={{ color: 'rgba(245,245,240,0.35)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} Cheers Magazine. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
