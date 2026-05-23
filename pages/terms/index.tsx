/**
 * pages/terms/index.tsx — Terms of Service
 */

import Head from 'next/head';
import Link from 'next/link';

const SECTIONS = [
  { title: '1. Acceptance of Terms', content: 'By accessing or using Cheers Magazine\'s digital platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.' },
  { title: '2. Subscription & Access', content: 'Access to full magazine content requires an active subscription. Subscriptions are personal and non-transferable. Sharing account credentials is prohibited and may result in account termination.' },
  { title: '3. Intellectual Property', content: 'All content published in Cheers Magazine, including text, images, design, and branding, is the exclusive property of Cheers Magazine and protected by copyright law. Reproduction, redistribution, or commercial use without written permission is strictly prohibited.' },
  { title: '4. Prohibited Uses', content: 'You may not: screenshot or screen-record magazine pages for redistribution; use automated tools to scrape or download content; share subscription access; or circumvent our digital rights management systems.' },
  { title: '5. Payment & Refunds', content: 'Subscriptions are billed in advance. We offer a 7-day refund for new subscribers if you are unsatisfied. Single issue purchases are non-refundable once accessed.' },
  { title: '6. Termination', content: 'We reserve the right to terminate accounts that violate these terms, engage in piracy, or use our platform for unlawful purposes. Refunds are not issued for terminated accounts due to policy violations.' },
  { title: '7. Limitation of Liability', content: 'Cheers Magazine is provided "as is." We are not liable for service interruptions, data loss, or indirect damages arising from use of the platform.' },
  { title: '8. Governing Law', content: 'These terms are governed by the laws of Cameroon. Any disputes shall be resolved through binding arbitration in Buea, Cameroon.' },
];

export default function TermsPage() {
  return (
    <>
      <Head><title>Terms of Service — Cheers Magazine</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1A1A1A', padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#F5F5F0', textDecoration: 'none' }}>
            CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
          </Link>
          <Link href="/" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>← Home</Link>
        </nav>

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 2rem' }}>
          <p style={{ color: '#C8102E', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>Legal</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '0.5rem' }}>Terms of Service</h1>
          <p style={{ opacity: 0.3, fontSize: '0.8rem', marginBottom: '3rem' }}>Last updated: May 2026</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {SECTIONS.map(s => (
              <div key={s.title}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.8rem' }}>{s.title}</h2>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.8, opacity: 0.65 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
