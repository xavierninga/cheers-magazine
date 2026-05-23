/**
 * app.js — Cheers Magazine Shared JS
 * Nav, footer, FeatureFlags, MagazineStore, DebugLog, CheersAPI
 */

/* ── Feature Flags ───────────────────────────── */
const FeatureFlags = {
  _defaults: {
    sounds: true, animations: true, antiPiracy: false,
    watermark: true, fullscreen: true, debugMode: true, payments: false,
  },
  get(k)    { const v = sessionStorage.getItem('ff_'+k); return v !== null ? v==='true' : (this._defaults[k]??false); },
  set(k,v)  { sessionStorage.setItem('ff_'+k, String(v)); window.dispatchEvent(new CustomEvent('ff-change',{detail:{k,v}})); },
  reset()   { Object.keys(this._defaults).forEach(k=>sessionStorage.removeItem('ff_'+k)); },
  all()     { const o={}; Object.keys(this._defaults).forEach(k=>{o[k]=this.get(k);}); return o; },
};

/* ── Magazine Page Store ─────────────────────── */
const MagazineStore = {
  KEY: 'cheers_pages_v2',
  save(pages)  { try { localStorage.setItem(this.KEY, JSON.stringify(pages)); return true; } catch(e) { return false; } },
  load()       { try { const d=localStorage.getItem(this.KEY); return d?JSON.parse(d):null; } catch { return null; } },
  clear()      { localStorage.removeItem(this.KEY); },
  hasData()    { return !!localStorage.getItem(this.KEY); },
  count()      { const d=this.load(); return d?d.length:0; },
};

/* ── Debug Log ───────────────────────────────── */
const DebugLog = {
  _entries: [], _cbs: [],
  push(level, msg) {
    const e={level, msg, time:new Date().toLocaleTimeString()};
    this._entries.unshift(e);
    if(this._entries.length>80) this._entries.pop();
    this._cbs.forEach(fn=>fn(e));
    if(FeatureFlags.get('debugMode')) console[level==='error'?'error':level==='warn'?'warn':'log']('[Cheers]',msg);
  },
  info(m)    { this.push('info',m); },
  success(m) { this.push('success',m); },
  error(m)   { this.push('error',m); },
  warn(m)    { this.push('warn',m); },
  onEntry(fn){ this._cbs.push(fn); },
  all()      { return [...this._entries]; },
};

/* ── API ─────────────────────────────────────── */
const CheersAPI = {
  BASE: (location.hostname==='localhost'||location.port==='3000') ? 'http://localhost:3000/api' : '/api',
  async getIssues() {
    try {
      const r = await fetch(this.BASE+'/issues', {signal: AbortSignal.timeout(3000)});
      if(!r.ok) throw new Error('not ok');
      return (await r.json()).issues || [];
    } catch { return this._fallback(); }
  },
  _fallback() {
    return [
      {id:'issue-001',number:'001',title:'Premier Issue',date:'May 2026',description:'The inaugural edition — lifestyle, culture, and entertainment.',available:true},
      {id:'issue-002',number:'002',title:'Summer Edition',date:'June 2026',description:'Summer special — travel, fashion, and outdoor living.',available:false},
      {id:'issue-003',number:'003',title:'Culture & Arts',date:'July 2026',description:'Deep dive into Cameroonian art, music, and cultural heritage.',available:false},
      {id:'issue-004',number:'004',title:'Business & Lifestyle',date:'August 2026',description:'Entrepreneurship, success stories, and luxury lifestyle.',available:false},
    ];
  },
};

/* ── Shared UI helpers ───────────────────────── */
function buildIssueCard(issue) {
  const card = document.createElement('div');
  card.className = 'issue-card';
  card.innerHTML = `
    <div class="issue-cover">
      <span class="issue-num-bg">#${issue.number}</span>
      <div class="cover-fade"></div>
      ${issue.available ? '<span class="issue-new-badge">New</span>' : ''}
      ${!issue.available ? '<div class="issue-soon-overlay"><span class="issue-soon-label">Coming Soon</span></div>' : ''}
    </div>
    <div class="issue-body">
      <p class="issue-vol">Vol. ${issue.number} &nbsp;·&nbsp; ${issue.date}</p>
      <h3 class="issue-name">${issue.title}</h3>
      <p class="issue-date">${issue.description}</p>
      ${issue.available
        ? `<a href="reader.html" class="issue-btn">Read Now</a>`
        : `<span class="issue-btn" style="opacity:.35;pointer-events:none;cursor:default">Coming Soon</span>`}
    </div>`;
  return card;
}

/* ── Init shared ─────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* Nav hamburger */
  const ham   = document.getElementById('ham');
  const links = document.getElementById('navLinks');
  if (ham && links) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      links.classList.toggle('open');
    });
  }
  /* Nav scroll tint */
  const nav = document.getElementById('siteNav');
  if (nav) {
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), {passive:true});
  }
  /* Footer year */
  const yr = document.getElementById('footerYear');
  if (yr) yr.textContent = `© ${new Date().getFullYear()} Cheers Magazine. All rights reserved.`;
  /* Active nav link */
  const page = location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
});
