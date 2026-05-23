/**
 * pages/subscribe/index.tsx — Subscribe Page
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const PLANS = [
  {
    id: 'monthly',
    label: 'Monthly',
    price: '2,500',
    currency: 'XAF',
    period: '/month',
    description: 'Full access to every issue. Cancel anytime.',
    features: ['All current & back issues', 'Immersive digital reader', 'Early access to new issues', 'Download for offline reading'],
    highlight: false,
  },
  {
    id: 'annual',
    label: 'Annual',
    price: '24,000',
    currency: 'XAF',
    period: '/year',
    badge: 'Best Value',
    description: '2 months free compared to monthly billing.',
    features: ['Everything in Monthly', '2 months free', 'Exclusive subscriber content', 'Priority customer support', 'Collector digital editions'],
    highlight: true,
  },
  {
    id: 'single',
    label: 'Single Issue',
    price: '500',
    currency: 'XAF',
    period: '/issue',
    description: 'Buy individual issues without a commitment.',
    features: ['One complete issue', 'Permanent access to purchased issue', 'Full reader experience'],
    highlight: false,
  },
];

export default function SubscribePage() {
  const [selected, setSelected] = useState('annual');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      <Head><title>Subscribe — Cheers Magazine</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1A1A1A', padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#F5F5F0', textDecoration: 'none' }}>
            CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
          </Link>
          <Link href="/" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>← Home</Link>
        </nav>

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#C8102E', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>Subscribe</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
              Choose Your Plan
            </h1>
            <p style={{ opacity: 0.5, fontSize: '1rem', letterSpacing: '0.04em', maxWidth: 420, margin: '0 auto' }}>
              Full access to every issue of Cheers Magazine in the premium digital reader.
            </p>
          </div>

          {/* Plans */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {PLANS.map(plan => (
              <div
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                style={{
                  background: selected === plan.id ? 'rgba(200,16,46,0.06)' : '#1A1A1A',
                  border: `2px solid ${selected === plan.id ? '#C8102E' : '#2D2D2D'}`,
                  borderRadius: 6,
                  padding: '2rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                {plan.badge && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#C8102E', color: 'white', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '3px 14px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                    {plan.badge}
                  </div>
                )}
                <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 8 }}>{plan.label}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 900, color: selected === plan.id ? '#C8102E' : '#F5F5F0' }}>{plan.price}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{plan.currency}{plan.period}</span>
                </div>
                <p style={{ fontSize: '0.8rem', opacity: 0.45, marginBottom: '1.2rem', lineHeight: 1.5 }}>{plan.description}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ fontSize: '0.82rem', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      <span style={{ color: '#C8102E', flexShrink: 0 }}>✓</span>
                      <span style={{ opacity: 0.7 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Email Form */}
          {!submitted ? (
            <div style={{ maxWidth: 480, margin: '0 auto', background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '2rem' }}>
              <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '1.2rem', textAlign: 'center' }}>GET STARTED</p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block', marginBottom: 6, letterSpacing: '0.1em' }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', background: '#111', border: '1px solid #2D2D2D', color: '#F5F5F0', padding: '0.7rem 1rem', borderRadius: 4, fontSize: '0.95rem', fontFamily: "'Barlow Condensed', sans-serif", outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{ width: '100%', padding: '0.9rem', background: '#C8102E', border: 'none', color: 'white', fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 4, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
                >
                  Continue to Payment →
                </button>
                <p style={{ fontSize: '0.7rem', opacity: 0.3, textAlign: 'center', lineHeight: 1.5 }}>
                  Selected: {PLANS.find(p => p.id === selected)?.label} — {PLANS.find(p => p.id === selected)?.price} {PLANS.find(p => p.id === selected)?.currency}{PLANS.find(p => p.id === selected)?.period}
                </p>
              </form>
            </div>
          ) : (
            <div style={{ maxWidth: 480, margin: '0 auto', background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.3)', borderRadius: 6, padding: '3rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.5rem' }}>Thank You!</h2>
              <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Check your email at <strong>{email}</strong> to complete your subscription.</p>
              <Link href="/reader" style={{ padding: '0.7rem 2rem', background: '#C8102E', color: 'white', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 4, display: 'inline-block' }}>
                Read Now →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
