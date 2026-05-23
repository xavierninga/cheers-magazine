/**
 * pages/contact/index.tsx — Contact Page
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  return (
    <>
      <Head><title>Contact — Cheers Magazine</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1A1A1A', padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#F5F5F0', textDecoration: 'none' }}>
            CHEERS <span style={{ color: '#C8102E' }}>MAGAZINE</span>
          </Link>
          <Link href="/" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>← Home</Link>
        </nav>

        <div style={{ maxWidth: 640, margin: '0 auto', padding: '5rem 2rem' }}>
          <p style={{ color: '#C8102E', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>Get in Touch</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '3rem' }}>Contact Us</h1>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                { key: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block', marginBottom: 6, letterSpacing: '0.1em' }}>{field.label.toUpperCase()}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={(form as any)[field.key]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    style={{ width: '100%', background: '#1A1A1A', border: '1px solid #2D2D2D', color: '#F5F5F0', padding: '0.7rem 1rem', borderRadius: 4, fontSize: '0.95rem', fontFamily: "'Barlow Condensed', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#C8102E'}
                    onBlur={e => e.target.style.borderColor = '#2D2D2D'}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block', marginBottom: 6, letterSpacing: '0.1em' }}>MESSAGE</label>
                <textarea
                  placeholder="Your message..."
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  style={{ width: '100%', background: '#1A1A1A', border: '1px solid #2D2D2D', color: '#F5F5F0', padding: '0.7rem 1rem', borderRadius: 4, fontSize: '0.95rem', fontFamily: "'Barlow Condensed', sans-serif", outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#C8102E'}
                  onBlur={e => e.target.style.borderColor = '#2D2D2D'}
                />
              </div>
              <button type="submit" style={{ padding: '0.9rem', background: '#C8102E', border: 'none', color: 'white', fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 4, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>
                Send Message
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.3)', borderRadius: 6, padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Sent!</h2>
              <p style={{ opacity: 0.6, marginBottom: '1.5rem' }}>We'll be in touch at <strong>{form.email}</strong></p>
              <Link href="/" style={{ color: '#C8102E', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em' }}>← Back to Home</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
