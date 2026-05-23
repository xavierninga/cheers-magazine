# 🍾 Cheers Magazine — Complete Website

Pure HTML/CSS/JavaScript — no build step, no Node.js required.

---

## 📁 Project Structure

```
cheers-magazine/
│
├── index.html              ← Homepage
├── reader.html             ← Magazine Reader  ⭐ main feature
├── issues.html             ← All Issues
├── subscribe.html          ← Subscription plans
├── about.html              ← About page
├── contact.html            ← Contact form
├── privacy.html            ← Privacy Policy
├── terms.html              ← Terms of Service
├── 404.html                ← Error page
│
├── css/
│   ├── global.css          ← Variables, reset, nav, footer, buttons
│   ├── homepage.css        ← Hero, issue grid, features strip
│   ├── reader.css          ← Full reader UI
│   └── pages.css           ← All inner pages + dev tools
│
├── js/
│   ├── app.js              ← Shared: FeatureFlags, MagazineStore, API, nav
│   ├── pages.js            ← Shared nav/footer renderer for inner pages
│   └── reader.js           ← Full reader: flip, zoom, sound, swipe, keyboard
│
├── dev/                    ← 🛠 Developer Testing Hub
│   ├── index.html          ← Testing dashboard
│   ├── pdf-upload.html     ← ⭐ Upload PDF → extract pages → open in reader
│   ├── sound-lab.html      ← Test all sound effects
│   ├── reader-tests.html   ← Page flip speed/easing playground
│   ├── motion-tests.html   ← Animation playground
│   ├── security-tests.html ← Watermark & anti-piracy
│   ├── ui-showcase.html    ← Full component library
│   ├── feature-flags.html  ← Toggle all features live
│   ├── debug-panel.html    ← FPS, memory, event stream
│   └── payment-sim.html    ← Payment flow simulator
│
├── images/
│   └── cheers-logo.jpg     ← Brand logo
│
└── sounds/                 ← Add your MP3 files here
    ├── README.md           ← Instructions
    ├── page-flip/
    ├── hover/
    ├── click/
    ├── transitions/
    ├── notifications/
    └── immersive/
```

---

## 🚀 How to Run (3 ways)

### Option 1 — Open directly in browser (simplest)
```
Double-click index.html
```
Works immediately. PDF upload works via `dev/pdf-upload.html`.

### Option 2 — Local server (recommended for full features)
```bash
# Python 3
cd cheers-magazine
python3 -m http.server 8080
# Open: http://localhost:8080
```

```bash
# Node.js (if installed)
npx serve .
```

### Option 3 — Deploy to Vercel / Netlify
Drag the entire `cheers-magazine/` folder into Vercel or Netlify.
No configuration needed — it's pure static HTML.

---

## 📄 HOW TO UPLOAD A SAMPLE PDF (Step-by-Step)

This is how you load a real magazine into the reader:

### Step 1 — Get a PDF
Any PDF works for testing:
- A magazine, brochure, or multi-page document
- Free magazine PDFs from **issuu.com** (use their download option)
- Any local PDF you already have

### Step 2 — Open the PDF Upload Tool
```
Open: dev/pdf-upload.html
```
Or click **"📄 Upload PDF"** from the dev banner on any page.

### Step 3 — Drop or Browse
- **Drag and drop** your PDF onto the drop zone, OR
- Click **"Browse File"** and select your PDF

> 💡 The file is processed entirely in your browser — nothing is sent to any server.

### Step 4 — Configure (optional)
| Setting | Recommended | Notes |
|---------|-------------|-------|
| Render Scale | 1.5× | Good quality, reasonable speed |
| JPEG Quality | 85% | Best balance |
| Max Pages | All | Or limit to 25 for large PDFs |

### Step 5 — Click "Extract Pages"
- Pages are rendered one by one as JPEG images
- Thumbnails appear on the right in real time
- Conversion log shows progress and file sizes

### Step 6 — Open Reader
When extraction is complete:
- A green **"✅ Pages saved to reader!"** notice appears
- Click **"📖 Open Reader"** — your magazine loads instantly

### Step 7 — Read!
The reader supports:
| Control | Action |
|---------|--------|
| `→` / Swipe Left | Next page |
| `←` / Swipe Right | Previous page |
| `+` / `-` | Zoom in / out |
| `0` | Reset zoom |
| `F` | Fullscreen |
| `M` | Mute/unmute |
| `⊞` button | Toggle thumbnails |

> ⚠️ Pages are saved in **localStorage** — they persist until you click "Clear All"
> or clear your browser data. Upload a new PDF anytime to replace them.

---

## 🚩 Feature Flags

Toggle features live at `dev/feature-flags.html` or in `js/app.js`:

| Flag | Default | Description |
|------|---------|-------------|
| `sounds` | ON | Page flip audio (Web Audio API) |
| `animations` | ON | Page flip & transition animations |
| `watermark` | ON | User watermark on reader pages |
| `antiPiracy` | OFF | Screen capture protection |
| `fullscreen` | ON | Fullscreen reader mode |
| `debugMode` | ON | Debug panel & logging |
| `payments` | OFF | Payment UI flows |

---

## 🔊 Adding Real Sound Files

1. Add MP3 files to `sounds/<category>/filename.mp3`
2. Test them at `dev/sound-lab.html`
3. Connect to reader: edit `playFlipSound()` in `js/reader.js`

**Free sounds:** freesound.org · zapsplat.com · mixkit.co

---

## 🌐 Deployment to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Drag the `cheers-magazine/` folder or connect GitHub
3. Framework: **Other** (static)
4. Root directory: `cheers-magazine/`
5. Click Deploy ✅

---

## 🌐 Deployment to Netlify

1. Go to [netlify.com](https://netlify.com) → Sites → Add new site
2. **Drag and drop** the `cheers-magazine/` folder
3. Live in 30 seconds ✅

---

*Cheers Magazine Platform — v1.0.0 — Pure HTML/CSS/JS*
