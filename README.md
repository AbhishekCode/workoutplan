# Workout Plan

A React single-page application (SPA) with Vite, configured as a mobile-optimized PWA.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## PWA (Progressive Web App)

The app is set up as a PWA for mobile:

- **Display**: `standalone` (full-screen, app-like)
- **Orientation**: `portrait` (mobile-first)
- **Viewport**: Mobile viewport with safe-area insets for notched devices
- **Meta**: `apple-mobile-web-app-capable`, `theme-color`, status bar style
- **Service worker**: Auto-update; caches assets for offline use
- **Manifest**: Name, short name, theme/background colors, icons

Replace `public/favicon.svg` with your own icon. For best “Add to Home Screen” support on Android, add PNG icons (e.g. 192×192 and 512×512) under `public/icons/` and extend the `manifest.icons` array in `vite.config.js`.

---

## Deploy to GitHub Pages

### 1. Enable GitHub Pages

1. Push this repo to GitHub (e.g. `https://github.com/<username>/workoutplan`).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

### 2. Repo name and base path

The app is built with base path `/workoutplan/`. If your repo has a **different name**:

- In `vite.config.js`, change the base:
  ```js
  base: process.env.GITHUB_PAGES === 'true' ? '/your-repo-name/' : '/',
  ```
- In `.github/workflows/deploy.yml`, no change needed (it only builds and deploys `dist/`).

### 3. Deploy

**Option A – Automatic (recommended)**  
Push to the `main` branch. The **Deploy to GitHub Pages** workflow will build and deploy. After it finishes, the site is at:

`https://<username>.github.io/workoutplan/`

**Option B – From your machine**  
Install dependencies, then run:

```bash
npm install
npm run deploy
```

You’ll be prompted to log in to GitHub if needed. The `gh-pages` package will push the `dist/` folder to the `gh-pages` branch. Then in **Settings → Pages**, set **Source** to the **gh-pages** branch (and root), or keep using GitHub Actions after the first deploy.
