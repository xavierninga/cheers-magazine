/**
 * pages.js — Renders nav + footer for all inner pages
 */
function renderNav(activePage) {
  const links = [
    {href:'issues.html',label:'Issues'},
    {href:'about.html',label:'About'},
    {href:'subscribe.html',label:'Subscribe'},
  ];
  return `
  <nav class="site-nav" id="siteNav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <img src="images/cheers-logo.jpg" alt="Cheers Magazine" onerror="this.style.display='none'"/>
        <span class="logo-text">CHEERS <span class="red">MAGAZINE</span></span>
      </a>
      <div class="nav-links" id="navLinks">
        ${links.map(l=>`<a href="${l.href}"${activePage===l.href?' class="active"':''}>${l.label}</a>`).join('')}
        <a href="reader.html" class="nav-cta">Read Now</a>
      </div>
      <button class="hamburger" id="ham" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="logo-text">CHEERS <span class="red">MAGAZINE</span></span>
        <p>Premium digital magazine celebrating lifestyle, culture, and entertainment.</p>
      </div>
      <div class="footer-col">
        <p class="footer-col-title">Magazine</p>
        <a href="reader.html">Latest Issue</a>
        <a href="issues.html">All Issues</a>
        <a href="subscribe.html">Subscribe</a>
      </div>
      <div class="footer-col">
        <p class="footer-col-title">Company</p>
        <a href="about.html">About Us</a>
        <a href="contact.html">Contact</a>
        <a href="privacy.html">Privacy Policy</a>
        <a href="terms.html">Terms</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p id="footerYear"></p>
      <p>v1.0.0 · Cheers Magazine</p>
    </div>
  </footer>`;
}

function renderDevBanner(prefix) {
  const p = prefix || '';
  return `
  <div class="dev-banner">
    <span class="dev-banner-label">🛠 Dev:</span>
    <a href="${p}dev/index.html">Hub</a>
    <a href="${p}dev/pdf-upload.html">📄 Upload PDF</a>
    <a href="${p}reader.html">📖 Reader</a>
  </div>`;
}
