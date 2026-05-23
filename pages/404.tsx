/**
 * pages/404.tsx — Custom 404 page
 */

import Head from 'next/head';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <Head><title>404 — Page Not Found | Cheers Magazine</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '8rem', fontWeight: 900, color: '#C8102E', lineHeight: 1, opacity: 0.3 }}>404</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Page Not Found</h1>
          <p style={{ opacity: 0.5, fontSize: '1rem', marginBottom: '2.5rem', maxWidth: 380, margin: '0 auto 2.5rem' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/" style={{ padding: '0.8rem 2rem', background: '#C8102E', color: 'white', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 2 }}>
              Go Home
            </Link>
            <Link href="/reader" style={{ padding: '0.8rem 2rem', border: '1px solid rgba(245,245,240,0.2)', color: '#F5F5F0', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 2 }}>
              Read Magazine
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
