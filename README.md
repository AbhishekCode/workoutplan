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
