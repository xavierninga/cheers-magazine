# 🍾 Cheers Magazine — Premium Digital Reader Platform

> Enterprise-grade digital magazine platform built with Next.js 14, TypeScript, and Tailwind CSS.

---

## 📁 Project Structure

```
cheers-magazine/
├── pages/                        # Next.js pages (routes)
│   ├── _app.tsx                  # Root app wrapper
│   ├── index.tsx                 # Homepage
│   ├── 404.tsx                   # Custom 404 page
│   ├── about/index.tsx           # About page
│   ├── issues/index.tsx          # Issues listing
│   ├── subscribe/index.tsx       # Subscription page
│   ├── reader/index.tsx          # Magazine reader
│   ├── api/
│   │   ├── health.ts             # Health check endpoint
│   │   ├── issues/index.ts       # Issues API
│   │   └── pdf/upload.ts         # PDF upload endpoint
│   └── dev-testing/              # 🛠 Developer testing hub
│       ├── index.tsx             # Dev testing dashboard
│       ├── sound-lab.tsx         # Sound effect tester
│       ├── reader-tests.tsx      # Reader playground
│       ├── motion-tests.tsx      # Animation playground
│       ├── pdf-upload.tsx        # PDF extraction tester
│       ├── security-tests.tsx    # Anti-piracy / watermark tester
│       ├── ui-showcase.tsx       # UI component showcase
│       ├── feature-flags.tsx     # Feature flag panel
│       └── debug-panel.tsx       # FPS / memory / event debug panel
│
├── src/
│   ├── components/
│   │   ├── reader/
│   │   │   ├── premium-magazine-reader.tsx          # Main reader component
│   │   │   └── cinematic-page-flip-animation.tsx    # Page flip animation
│   │   ├── ui/
│   │   │   ├── debug-overlay.tsx                    # Floating debug overlay
│   │   │   └── feature-flags-panel.tsx              # Floating flags panel
│   │   └── layout/
│   │       ├── site-header.tsx                      # Navigation header
│   │       └── site-footer.tsx                      # Footer
│   ├── config/
│   │   ├── feature-flags.config.ts                  # Feature flag definitions
│   │   └── sound-system.config.ts                   # Sound registry
│   ├── hooks/
│   │   ├── use-sound-manager.ts                     # Sound playback hook
│   │   ├── use-immersive-fullscreen-reader.ts        # Fullscreen hook
│   │   ├── use-anti-piracy-watermark.ts             # Watermark hook
│   │   └── use-debug-mode.ts                        # Debug stats hook
│   ├── lib/
│   │   ├── utils.ts                                 # Utility functions
│   │   └── pdf-processor.ts                         # PDF → image extractor
│   ├── styles/
│   │   └── globals.css                              # Global styles + CSS variables
│   └── types/
│       └── index.ts                                 # TypeScript types
│
├── public/
│   ├── images/
│   │   └── cheers-logo.png                          # ⬅ ADD YOUR LOGO HERE
│   └── sounds/                                      # ⬅ ADD MP3 FILES HERE
│       ├── page-flip/
│       │   ├── page-flip-soft.mp3
│       │   ├── page-flip-hard.mp3
│       │   └── page-flip-quick.mp3
│       ├── hover/
│       │   ├── luxury-hover.mp3
│       │   └── nav-hover.mp3
│       ├── click/
│       │   ├── premium-click.mp3
│       │   └── nav-click.mp3
│       ├── transitions/
│       │   ├── cinematic-transition.mp3
│       │   └── smooth-transition.mp3
│       ├── notifications/
│       │   ├── success-notification.mp3
│       │   └── error-notification.mp3
│       └── immersive/
│           ├── magazine-open.mp3
│           └── reader-ambient.mp3
│
├── docs/
│   └── README.md                                    # This file
│
├── .env.example                                     # Environment variables template
├── .env.local                                       # Local dev variables (not committed)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** 18+ ([nodejs.org](https://nodejs.org))
- **npm** 9+ (comes with Node)

### 2. Install Dependencies
```bash
cd cheers-magazine
npm install
```

### 3. Set Up Environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🛠 Developer Testing Hub

All test modules are at **`/dev-testing`** (only visible in dev):

| URL | Purpose |
|-----|---------|
| `/dev-testing` | Central testing dashboard |
| `/dev-testing/sound-lab` | Test all sound effects |
| `/dev-testing/reader-tests` | Page flip, zoom, animation |
| `/dev-testing/motion-tests` | Animation playground |
| `/dev-testing/pdf-upload` | PDF drag & drop extraction |
| `/dev-testing/security-tests` | Watermark & anti-piracy |
| `/dev-testing/ui-showcase` | Components, colors, typography |
| `/dev-testing/feature-flags` | Toggle all feature flags |
| `/dev-testing/debug-panel` | FPS, memory, event log |

---

## 🎵 Adding Sound Files

Place MP3 files in `/public/sounds/<category>/`:

```
public/sounds/page-flip/page-flip-soft.mp3
public/sounds/page-flip/page-flip-hard.mp3
public/sounds/hover/luxury-hover.mp3
...
```

Then test them at `/dev-testing/sound-lab`.

**Free sound sources:**
- [freesound.org](https://freesound.org) — Search "page flip", "paper turn"
- [zapsplat.com](https://zapsplat.com)
- [mixkit.co](https://mixkit.co/free-sound-effects/)

---

## 🖼 Adding Your Logo

Replace `/public/images/cheers-logo.png` with the Cheers Magazine logo image.

The provided logo (WhatsApp_Image_2026-05-15...) should be copied and renamed:
```bash
cp /path/to/WhatsApp_Image_2026-05-15_at_00_49_05.jpeg public/images/cheers-logo.png
```

---

## 🚩 Feature Flags

Toggle via `.env.local`:

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_FEATURE_SOUNDS` | `true` | Sound effects system |
| `NEXT_PUBLIC_FEATURE_ANIMATIONS` | `true` | Page flip animations |
| `NEXT_PUBLIC_FEATURE_ANTI_PIRACY` | `false` | Screen protection overlay |
| `NEXT_PUBLIC_FEATURE_WATERMARK` | `true` | User watermarks |
| `NEXT_PUBLIC_FEATURE_FULLSCREEN` | `true` | Fullscreen mode |
| `NEXT_PUBLIC_FEATURE_DEBUG_MODE` | `true` | Debug overlay |
| `NEXT_PUBLIC_FEATURE_PAYMENTS` | `false` | Payment flows |

Runtime overrides via `/dev-testing/feature-flags` (sessionStorage, resets on tab close).

---

## ☁️ Vercel Deployment

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy
```bash
vercel --prod
```

### 3. Set Environment Variables in Vercel Dashboard
Go to: **Project → Settings → Environment Variables**

Required:
```
NEXT_PUBLIC_APP_URL = https://your-domain.vercel.app
NEXT_PUBLIC_APP_ENV = production
NEXT_PUBLIC_FEATURE_DEBUG_MODE = false
NEXT_PUBLIC_FEATURE_ANTI_PIRACY = true
```

---

## 🔌 Adding Real PDF Issues

1. Upload your magazine PDF
2. Go to `/dev-testing/pdf-upload` → drag and drop
3. Pages are extracted automatically
4. Save extracted images to `/public/issues/<issue-number>/page-XX.jpg`
5. Update the issues data in `pages/api/issues/index.ts`
6. Update the reader pages array in `pages/reader/index.tsx`

---

## 🐛 Debugging

### Debug Overlay
Enable in `.env.local`:
```
NEXT_PUBLIC_FEATURE_DEBUG_MODE=true
```
A `🐛` button appears bottom-right. Click to see FPS, memory, events.

### Health Check
```
GET /api/health
```
Returns app status, environment, uptime, and feature flags.

### Console Logging
Set `NEXT_PUBLIC_LOG_LEVEL=verbose` in `.env.local` for full logs.

---

## ⌨️ Keyboard Shortcuts (Reader)

| Key | Action |
|-----|--------|
| `→` / `↓` / `Space` | Next page |
| `←` / `↑` | Previous page |
| `+` | Zoom in |
| `-` | Zoom out |
| `0` | Reset zoom |
| `F` | Toggle fullscreen |
| `F11` | Toggle fullscreen (browser) |

---

## 📱 Mobile Gestures (Reader)

| Gesture | Action |
|---------|--------|
| Swipe left | Next page |
| Swipe right | Previous page |
| Pinch | Zoom |
| Double tap | Zoom in/out |

---

## 🔒 Anti-Piracy Features

1. **Visible Watermark** — User ID + email + date tiled over pages
2. **Forensic String** — Base64 encoded user identity in metadata
3. **Right-click Block** — Optional via feature flag
4. **Screen Capture Block** — Anti-piracy overlay (optional)
5. **No-Select CSS** — Prevents text selection on pages

Configure via `/dev-testing/security-tests`.

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Score | 90+ |
| First Contentful Paint | < 1.5s |
| Reader Load Time | < 2s |
| Page Flip FPS | 60fps |
| PDF Extraction | < 30s for 100 pages |

---

## 🏗 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | Framework + routing |
| TypeScript | Type safety |
| Tailwind CSS | Utility styling |
| Howler.js | Audio engine |
| PDF.js | PDF extraction |
| Framer Motion | Animations |
| Zustand | State management |

---

*Cheers Magazine Platform — v1.0.0*
