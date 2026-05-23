/**
 * pages/dev-testing/payment-sim.tsx
 * =====================================
 * 💳 Payment Simulation — Test checkout flows, success, failure, webhooks.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

type SimState = 'idle' | 'processing' | 'success' | 'failed' | 'cancelled';

const SCENARIOS = [
  { id: 'success', label: '✅ Successful Payment', color: '#4CAF50', delay: 2000 },
  { id: 'failed', label: '❌ Failed Payment', color: '#C8102E', delay: 2500 },
  { id: 'cancelled', label: '↩ User Cancelled', color: '#FF9800', delay: 800 },
  { id: 'timeout', label: '⏱ Payment Timeout', color: '#9E9E9E', delay: 5000 },
];

const PLANS = [
  { id: 'monthly', label: 'Monthly', price: '2,500 XAF' },
  { id: 'annual', label: 'Annual', price: '24,000 XAF' },
  { id: 'single', label: 'Single Issue', price: '500 XAF' },
];

export default function PaymentSimPage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedScenario, setSelectedScenario] = useState('success');
  const [state, setState] = useState<SimState>('idle');
  const [log, setLog] = useState<string[]>([]);
  const [transactionId, setTransactionId] = useState<string>('');

  const addLog = (msg: string) => {
    const t = new Date().toLocaleTimeString();
    setLog(prev => [`${t}  ${msg}`, ...prev]);
  };

  const simulate = () => {
    const scenario = SCENARIOS.find(s => s.id === selectedScenario)!;
    const plan = PLANS.find(p => p.id === selectedPlan)!;
    const txId = `TXN_${Date.now().toString(36).toUpperCase()}`;
    setTransactionId(txId);
    setState('processing');

    addLog(`[INIT] Starting payment for: ${plan.label} (${plan.price})`);
    addLog(`[TXN] Transaction ID: ${txId}`);
    addLog(`[SIM] Scenario: ${scenario.label}`);
    addLog(`[GATEWAY] Connecting to payment gateway...`);

    setTimeout(() => {
      addLog(`[GATEWAY] Connected. Processing...`);
    }, 600);

    setTimeout(() => {
      if (selectedScenario === 'success') {
        addLog(`[GATEWAY] ✅ Authorization approved`);
        addLog(`[WEBHOOK] POST /api/webhooks/payment { status: "succeeded" }`);
        addLog(`[DB] Subscription activated for user`);
        addLog(`[EMAIL] Confirmation email sent`);
        setState('success');
      } else if (selectedScenario === 'failed') {
        addLog(`[GATEWAY] ❌ Card declined — insufficient funds`);
        addLog(`[WEBHOOK] POST /api/webhooks/payment { status: "failed" }`);
        addLog(`[DB] Payment attempt logged`);
        setState('failed');
      } else if (selectedScenario === 'cancelled') {
        addLog(`[USER] Payment cancelled by user`);
        addLog(`[WEBHOOK] POST /api/webhooks/payment { status: "cancelled" }`);
        setState('cancelled');
      } else {
        addLog(`[GATEWAY] ⏱ Request timed out after 5s`);
        addLog(`[WEBHOOK] POST /api/webhooks/payment { status: "timeout" }`);
        setState('failed');
      }
    }, scenario.delay);
  };

  const reset = () => {
    setState('idle');
    setTransactionId('');
    setLog([]);
  };

  const statusColors: Record<SimState, string> = {
    idle: '#6B6B6B',
    processing: '#FF9800',
    success: '#4CAF50',
    failed: '#C8102E',
    cancelled: '#FF9800',
  };

  return (
    <>
      <Head><title>💳 Payment Simulation — Cheers Dev Testing</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>

        <div style={{ background: '#111', borderBottom: '1px solid #C8102E', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dev-testing" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>← Dev Hub</Link>
          <span style={{ color: '#2D2D2D' }}>|</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>💳 Payment Simulation</h1>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

          {/* Config */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

            {/* Plan Select */}
            <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1.2rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '0.8rem' }}>SELECT PLAN</p>
              {PLANS.map(plan => (
                <div key={plan.id} onClick={() => setSelectedPlan(plan.id)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', marginBottom: 6, background: selectedPlan === plan.id ? 'rgba(200,16,46,0.08)' : 'transparent', border: `1px solid ${selectedPlan === plan.id ? '#C8102E' : '#2D2D2D'}`, borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s' }}>
                  <span style={{ fontWeight: 600 }}>{plan.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#C8102E' }}>{plan.price}</span>
                </div>
              ))}
            </div>

            {/* Scenario */}
            <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1.2rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '0.8rem' }}>SIMULATION SCENARIO</p>
              {SCENARIOS.map(s => (
                <div key={s.id} onClick={() => setSelectedScenario(s.id)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', marginBottom: 6, background: selectedScenario === s.id ? 'rgba(200,16,46,0.05)' : 'transparent', border: `1px solid ${selectedScenario === s.id ? s.color : '#2D2D2D'}`, borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s' }}>
                  <span>{s.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', opacity: 0.4 }}>{s.delay}ms</span>
                </div>
              ))}
            </div>

            {/* Status */}
            <div style={{ background: '#1A1A1A', border: `1px solid ${statusColors[state]}`, borderRadius: 6, padding: '1rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', opacity: 0.5, marginBottom: 8 }}>STATUS</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: statusColors[state], textTransform: 'capitalize' }}>{state}</p>
              {transactionId && <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', opacity: 0.4, marginTop: 6 }}>{transactionId}</p>}
            </div>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button onClick={simulate} disabled={state === 'processing'}
                style={{ flex: 1, padding: '0.8rem', background: state === 'processing' ? '#2D2D2D' : '#C8102E', border: 'none', color: 'white', borderRadius: 4, cursor: state === 'processing' ? 'not-allowed' : 'pointer', fontSize: '0.9rem', letterSpacing: '0.1em', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>
                {state === 'processing' ? '⏳ Processing...' : '▶ Simulate Payment'}
              </button>
              <button onClick={reset}
                style={{ padding: '0.8rem 1.2rem', background: 'transparent', border: '1px solid #2D2D2D', color: '#F5F5F0', borderRadius: 4, cursor: 'pointer', fontSize: '0.9rem', fontFamily: "'Barlow Condensed', sans-serif" }}>
                Reset
              </button>
            </div>
          </div>

          {/* Log */}
          <div style={{ background: '#0A0A0A', border: '1px solid #2D2D2D', borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0.7rem 1rem', borderBottom: '1px solid #2D2D2D', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E' }}>PAYMENT EVENT LOG</span>
              <button onClick={() => setLog([])} style={{ background: 'none', border: 'none', color: 'rgba(245,245,240,0.3)', cursor: 'pointer', fontSize: '0.65rem' }}>Clear</button>
            </div>
            <div style={{ padding: '0.8rem', flex: 1, overflowY: 'auto', minHeight: 300, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' }}>
              {log.length === 0 ? (
                <p style={{ opacity: 0.3, fontFamily: "'Barlow Condensed', sans-serif" }}>Select a plan and scenario, then click Simulate Payment.</p>
              ) : log.map((entry, i) => (
                <div key={i} style={{ marginBottom: 4, opacity: 0.8, color: entry.includes('✅') ? '#4CAF50' : entry.includes('❌') || entry.includes('timeout') ? '#C8102E' : entry.includes('WEBHOOK') ? '#FF9800' : 'rgba(245,245,240,0.7)', lineHeight: 1.5 }}>
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
