/**
 * src/components/layout/site-footer.tsx
 * =======================================
 * Reusable site footer component.
 */

import React from 'react';
import Link from 'next/link';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid #1A1A1A',
      background: '#0A0A0A',
      padding: '3rem 2.5rem',
      fontFamily: "'Barlow Condensed', sans-serif",
      color: '#F5F5F0',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>

        {/* Brand */}
        <div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, display: 'block', marginBottom: '0.8rem' }}>
            CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
          </span>
          <p style={{ fontSize: '0.82rem', opacity: 0.45, lineHeight: 1.7, maxWidth: 240 }}>
            Premium digital magazine celebrating lifestyle, culture, and entertainment.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8102E', marginBottom: '1rem' }}>Magazine</p>
          {[
            { label: 'Latest Issue', href: '/reader' },
            { label: 'All Issues', href: '/issues' },
            { label: 'Subscribe', href: '/subscribe' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'block', color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.88rem', marginBottom: 6, transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C8102E'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,240,0.5)'; }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Company */}
        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8102E', marginBottom: '1rem' }}>Company</p>
          {[
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'block', color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.88rem', marginBottom: 6, transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C8102E'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,240,0.5)'; }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #1A1A1A', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.75rem', opacity: 0.3, letterSpacing: '0.08em' }}>
          © {year} Cheers Magazine. All rights reserved.
        </p>
        <p style={{ fontSize: '0.7rem', opacity: 0.2, fontFamily: "'JetBrains Mono', monospace" }}>
          v1.0.0 · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
