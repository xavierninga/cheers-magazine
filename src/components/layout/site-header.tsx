/**
 * src/components/layout/site-header.tsx
 * =======================================
 * Reusable site-wide header / navigation component.
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_LINKS = [
  { label: 'Issues', href: '/issues' },
  { label: 'About', href: '/about' },
  { label: 'Subscribe', href: '/subscribe' },
];

interface SiteHeaderProps {
  transparent?: boolean;
}

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const router = useRouter();

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: transparent ? 'transparent' : 'rgba(10,10,10,0.96)',
      backdropFilter: transparent ? 'none' : 'blur(12px)',
      borderBottom: transparent ? 'none' : '1px solid #1A1A1A',
      padding: '1rem 2.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: "'Barlow Condensed', sans-serif",
      transition: 'background 0.3s',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img src="/images/cheers-logo.png" alt="Cheers Magazine" height={40}
          style={{ objectFit: 'contain', display: 'block' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: '#F5F5F0', letterSpacing: '0.04em' }}>
          CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
        </span>
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {NAV_LINKS.map(link => {
          const isActive = router.pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} style={{
              color: isActive ? '#C8102E' : 'rgba(245,245,240,0.7)',
              textDecoration: 'none', fontSize: '0.85rem',
              fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C8102E'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isActive ? '#C8102E' : 'rgba(245,245,240,0.7)'; }}
            >
              {link.label}
            </Link>
          );
        })}
        <Link href="/reader" style={{
          background: '#C8102E', color: 'white',
          padding: '0.45rem 1.1rem', borderRadius: 2,
          textDecoration: 'none', fontSize: '0.8rem',
          fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FF1744'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C8102E'; }}
        >
          Read Now
        </Link>
      </nav>
    </header>
  );
}
