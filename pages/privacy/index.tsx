/**
 * pages/privacy/index.tsx — Privacy Policy
 */

import Head from 'next/head';
import Link from 'next/link';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide when subscribing or registering, including your name, email address, and payment information. We also collect usage data such as pages read, session duration, and device information to improve your experience.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'Your information is used to provide and improve our services, process payments, send you magazine updates and newsletters (with your consent), and protect against unauthorized access to your account.',
  },
  {
    title: '3. Digital Rights Management',
    content: 'To protect our content, we employ digital watermarking technology. Each page view may contain an invisible digital signature tied to your account. This is used solely for piracy detection and is never shared with third parties.',
  },
  {
    title: '4. Data Sharing',
    content: 'We do not sell your personal information. We may share data with payment processors and cloud service providers necessary to operate our platform. All third parties are contractually bound to protect your data.',
  },
  {
    title: '5. Cookies',
    content: 'We use essential cookies to maintain your session and preferences such as volume settings and reading position. We do not use advertising cookies.',
  },
  {
    title: '6. Data Retention',
    content: 'We retain your account data for as long as your account is active. You may request deletion of your data at any time by contacting us.',
  },
  {
    title: '7. Your Rights',
    content: 'You have the right to access, correct, or delete your personal data. You may also request a copy of all data we hold about you. Contact us to exercise these rights.',
  },
  {
    title: '8. Contact',
    content: 'For privacy-related questions, contact us through our contact page. We respond to all privacy requests within 30 days.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Head><title>Privacy Policy — Cheers Magazine</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1A1A1A', padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#F5F5F0', textDecoration: 'none' }}>
            CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
          </Link>
          <Link href="/" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>← Home</Link>
        </nav>

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 2rem' }}>
          <p style={{ color: '#C8102E', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>Legal</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '0.5rem' }}>Privacy Policy</h1>
          <p style={{ opacity: 0.3, fontSize: '0.8rem', marginBottom: '3rem' }}>Last updated: May 2026</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {SECTIONS.map(section => (
              <div key={section.title}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.8rem', color: '#F5F5F0' }}>{section.title}</h2>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.8, opacity: 0.65 }}>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
