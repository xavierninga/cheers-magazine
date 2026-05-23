/**
 * reader.js — Cheers Magazine Immersive Reader
 * Page flip · Sound · Watermark · Zoom · Swipe · Keyboard · Fullscreen
 */

/* ── State ───────────────────────────────────── */
const R = { pages:[], current:0, zoom:1, flipping:false, muted:false, thumbsOpen:false };

/* ── DOM refs (populated on DOMContentLoaded) ── */
const D = {};

/* ── Synthesised page-flip sound ─────────────── */
let _actx = null;
function _ac() {
  if (!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)();
  return _actx;
}
function playFlipSound(dir) {
  if (R.muted || !FeatureFlags.get('sounds')) return;
  try {
    const ctx = _ac();
    const len = Math.floor(ctx.sampleRate * 0.18);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d   = buf.getChannelData(0);
    const fr  = dir === 'next' ? 2100 : 1700;
    for (let i=0; i<len; i++) {
      const t = i / ctx.sampleRate;
      d[i] = Math.exp(-t * 22) * (Math.random()*2-1) * 0.52;
    }
    const src = ctx.createBufferSource();
    const flt = ctx.createBiquadFilter();
    flt.type = 'bandpass'; flt.frequency.value = fr; flt.Q.value = 0.75;
    src.buffer = buf;
    src.connect(flt); flt.connect(ctx.destination);
    src.start();
  } catch(e) {}
}

/* ── Watermark ───────────────────────────────── */
function applyWatermark(el) {
  if (!FeatureFlags.get('watermark')) { el.style.backgroundImage=''; return; }
  const cv = document.createElement('canvas');
  cv.width = 380; cv.height = 190;
  const ctx = cv.getContext('2d');
  ctx.font = '12px Georgia,serif';
  ctx.fillStyle = '#C8102E';
  ctx.globalAlpha = 0.052;
  ctx.translate(190, 95);
  ctx.rotate(-33 * Math.PI / 180);
  const lines = ['CHEERS MAGAZINE', 'cheers-reader', new Date().toLocaleDateString()];
  lines.forEach((l,i) => ctx.fillText(l, -ctx.measureText(l).width/2, (i-1)*17));
  el.style.backgroundImage   = `url(${cv.toDataURL()})`;
  el.style.backgroundRepeat  = 'repeat';
  el.style.backgroundSize    = '230px';
}

/* ── Render current page ─────────────────────── */
function renderPage() {
  const p = R.pages[R.current];
  if (!p) return;
  if (p.dataUrl || p.imageUrl) {
    D.img.src = p.dataUrl || p.imageUrl;
    D.img.style.display    = 'block';
    D.placeholder.style.display = 'none';
  } else {
    D.img.style.display    = 'none';
    D.placeholder.style.display = 'flex';
    D.placeholderNum.textContent = String(R.current+1).padStart(2,'0');
  }
  applyWatermark(D.watermark);
  // Pre-load adjacent
  [-1,1].forEach(offset => {
    const idx = R.current + offset;
    if (idx>=0 && idx<R.pages.length) {
      const pg = R.pages[idx];
      if (pg?.dataUrl || pg?.imageUrl) { const t=new Image(); t.src=pg.dataUrl||pg.imageUrl; }
    }
  });
}

/* ── Update all UI elements ──────────────────── */
function updateUI() {
  const total = R.pages.length, cur = R.current+1;
  const pct   = total ? (cur/total)*100 : 0;
  D.topInfo.textContent    = `${cur} / ${total}`;
  D.ctrlPage.textContent   = `${cur} / ${total}`;
  D.progressFill.style.width = pct+'%';
  D.zoomLabel.textContent  = Math.round(R.zoom*100)+'%';
  D.btnPrev.disabled       = R.current <= 0;
  D.btnNext.disabled       = R.current >= total-1;
  D.btnMute.textContent    = R.muted ? '🔇' : '🔊';
  D.book.style.setProperty('--zoom', R.zoom);
  D.book.style.transform   = `scale(${R.zoom})`;
  D.btnThumbs.classList.toggle('active', R.thumbsOpen);
  // Thumbnail active
  document.querySelectorAll('.thumb-btn').forEach((btn,i) => {
    btn.classList.toggle('active', i===R.current);
    if (i===R.current) btn.scrollIntoView({inline:'nearest',block:'nearest'});
  });
}

/* ── Flip ────────────────────────────────────── */
function flipTo(target, dir) {
  if (R.flipping || target<0 || target>=R.pages.length || target===R.current) return;
  R.flipping = true;
  playFlipSound(dir);
  D.book.classList.remove('flip-next','flip-prev');
  void D.book.offsetWidth; // force reflow
  D.book.classList.add(dir==='next' ? 'flip-next' : 'flip-prev');
  setTimeout(() => {
    R.current = target;
    renderPage();
    D.book.classList.remove('flip-next','flip-prev');
    R.flipping = false;
    updateUI();
    rebuildThumbs();
  }, 560);
}
const goNext = () => flipTo(R.current+1, 'next');
const goPrev = () => flipTo(R.current-1, 'prev');

/* ── Thumbnails ──────────────────────────────── */
function rebuildThumbs() {
  D.thumbsStrip.innerHTML = '';
  R.pages.forEach((p,i) => {
    const btn = document.createElement('button');
    btn.className = 'thumb-btn' + (i===R.current?' active':'');
    btn.setAttribute('aria-label', 'Page '+(i+1));
    if (p.dataUrl||p.imageUrl) {
      const img = document.createElement('img');
      img.src = p.dataUrl||p.imageUrl; img.alt='Page '+(i+1);
      btn.appendChild(img);
    } else {
      btn.innerHTML = `<div class="thumb-num">${i+1}</div>`;
    }
    btn.addEventListener('click', () => flipTo(i, i>R.current?'next':'prev'));
    D.thumbsStrip.appendChild(btn);
  });
}

/* ── Zoom ────────────────────────────────────── */
function setZoom(z) {
  R.zoom = Math.max(0.5, Math.min(3, z));
  D.book.style.transform = `scale(${R.zoom})`;
  D.zoomLabel.textContent = Math.round(R.zoom*100)+'%';
}

/* ── Load pages ──────────────────────────────── */
function loadPages(pages) {
  if (!pages || !pages.length) { showEmpty(); return; }
  R.pages = pages; R.current = 0;
  D.loading.style.display = 'none';
  D.empty.style.display   = 'none';
  D.pageWrap.style.display = 'flex';
  renderPage(); updateUI(); rebuildThumbs();
}
function showEmpty() {
  D.loading.style.display  = 'none';
  D.empty.style.display    = 'flex';
  D.pageWrap.style.display = 'none';
}

/* ── Fullscreen ──────────────────────────────── */
function toggleFs() {
  if (!document.fullscreenElement) {
    (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen)?.call(document.documentElement);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
  }
}
document.addEventListener('fullscreenchange', () => {
  if(D.btnFs) D.btnFs.textContent = document.fullscreenElement ? '⊡' : '⛶';
});

/* ── Touch swipe ─────────────────────────────── */
let _tx = 0;
document.addEventListener('touchstart', e => { _tx = e.touches[0].clientX; }, {passive:true});
document.addEventListener('touchend',   e => {
  const diff = _tx - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff>0 ? goNext() : goPrev();
});

/* ── Keyboard ────────────────────────────────── */
document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowRight': case 'ArrowDown': case ' ': e.preventDefault(); goNext(); break;
    case 'ArrowLeft':  case 'ArrowUp':             e.preventDefault(); goPrev(); break;
    case '+': case '=': setZoom(R.zoom+0.15); break;
    case '-': case '_': setZoom(R.zoom-0.15); break;
    case '0':           setZoom(1);           break;
    case 'f': case 'F': case 'F11': e.preventDefault(); toggleFs(); break;
    case 'm': case 'M': R.muted=!R.muted; if(D.btnMute) D.btnMute.textContent=R.muted?'🔇':'🔊'; break;
  }
});

/* ── Init ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  D.book          = document.getElementById('pageBook');
  D.img           = document.getElementById('pageImg');
  D.placeholder   = document.getElementById('pagePlaceholder');
  D.placeholderNum= document.getElementById('placeholderNum');
  D.watermark     = document.getElementById('watermarkLayer');
  D.btnPrev       = document.getElementById('btnPrev');
  D.btnNext       = document.getElementById('btnNext');
  D.progressFill  = document.getElementById('progressFill');
  D.topInfo       = document.getElementById('readerTopInfo');
  D.ctrlPage      = document.getElementById('ctrlPage');
  D.zoomLabel     = document.getElementById('zoomLabel');
  D.btnMute       = document.getElementById('btnMute');
  D.btnFs         = document.getElementById('btnFs');
  D.btnThumbs     = document.getElementById('btnThumbs');
  D.thumbsStrip   = document.getElementById('thumbsStrip');
  D.loading       = document.getElementById('readerLoading');
  D.loadFill      = document.getElementById('loadFill');
  D.loadMsg       = document.getElementById('loadMsg');
  D.empty         = document.getElementById('readerEmpty');
  D.pageWrap      = document.getElementById('pageWrap');

  /* Wire controls */
  document.getElementById('btnPrev').addEventListener('click', goPrev);
  document.getElementById('btnNext').addEventListener('click', goNext);
  document.getElementById('btnZoomIn') .addEventListener('click', () => setZoom(R.zoom+0.15));
  document.getElementById('btnZoomOut').addEventListener('click', () => setZoom(R.zoom-0.15));
  document.getElementById('btnZoomRst').addEventListener('click', () => setZoom(1));
  document.getElementById('btnMute').addEventListener('click', () => { R.muted=!R.muted; D.btnMute.textContent=R.muted?'🔇':'🔊'; });
  document.getElementById('btnFs').addEventListener('click', toggleFs);
  document.getElementById('btnThumbs').addEventListener('click', () => {
    R.thumbsOpen = !R.thumbsOpen;
    document.getElementById('thumbsStrip').parentElement.classList.toggle('open', R.thumbsOpen);
    D.btnThumbs.classList.toggle('active', R.thumbsOpen);
  });
  document.getElementById('btnUploadPdf').addEventListener('click', () => location.href='dev/pdf-upload.html');

  /* Load from storage */
  const saved = MagazineStore.load();
  if (saved && saved.length) {
    D.loadMsg.textContent = `Loading ${saved.length} pages…`;
    let p=0;
    const iv = setInterval(() => { p+=7; D.loadFill.style.width=Math.min(p,94)+'%'; if(p>=94) clearInterval(iv); }, 40);
    setTimeout(() => { clearInterval(iv); D.loadFill.style.width='100%'; setTimeout(()=>loadPages(saved),200); }, 700);
  } else {
    showEmpty();
  }
});
