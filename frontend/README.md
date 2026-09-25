# Project BMO — Next.js Frontend

A Next.js (App Router) + Tailwind CSS rebuild of the Project BMO landing page,
matching the original neumorphic design system (colors, shadows, fonts,
animations).

## Stack

- **Next.js 14** (App Router, JavaScript)
- **Tailwind CSS** — design tokens (colors, box-shadows) are configured in
  `tailwind.config.js` to match the original HTML exactly
- **next/font** for Plus Jakarta Sans and JetBrains Mono
- **next/image** for the crest/logo images (remote `lh3.googleusercontent.com`
  images are allow-listed in `next.config.mjs`)

## Getting started

You'll need Node.js 18.18+ installed locally. All commands below are run
from inside this `frontend/` folder.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Project structure

```
frontend/
  app/
    layout.jsx        Root layout — fonts, metadata, Material Symbols stylesheet
    page.jsx           Assembles the page from the components below
    globals.css        Tailwind directives + all original keyframes/utility classes
  components/
    AmbientBackground.jsx   The drifting neumorphic tiles + contour lines (client)
    Header.jsx              Sticky nav with the animated sliding pill indicator (client)
    Hero.jsx                Hero section with the crest, title, mission summary
    Pillars.jsx              4-card "Architected for Authentic Civic Impact" grid
    ImpactStats.jsx          Animated stat counters, triggered on scroll (client)
    Footer.jsx               Site footer
    FadeUp.jsx               Reusable scroll-reveal wrapper (client)
  public/
  package.json, package-lock.json, next.config.mjs, tailwind.config.js,
  postcss.config.js, jsconfig.json   Scoped to this app only
```

The `@/*` import alias (used e.g. as `@/components/Header`) is configured in
this folder's `jsconfig.json` with `baseUrl: "."`, so it resolves relative to
`frontend/` — no changes were needed to any import paths when this app moved
under `frontend/`.

## Notes / things to check next

- The original HTML had comment markers for a "Deployment Request" order flow
  and a proposal/confirmation modal, but their actual markup wasn't present in
  the file you gave me — only some now-orphaned JS logic (quantity controls,
  pricing calculator, modal open/close) that references elements that don't
  exist. That logic wasn't ported since there was no matching UI to attach it
  to. If you want that ordering/quote-request flow rebuilt, send me the
  original section (or describe what it should contain) and I'll build it as
  a proper component with React state instead of DOM queries.
- Images are currently pulled from the original `lh3.googleusercontent.com`
  URLs. For a real deployment, swap these for your own assets in `/public`
  and update the `src` props (this also lets you drop the `remotePatterns`
  config in `next.config.mjs`).
- The "Log In" nav link and "Explore System" button are wired to in-page
  anchors (`#login`, `#pillars`) — hook these up to real routes once you have
  auth/kiosk-config pages.
- Once `backend/` has real endpoints, this is the place to add API calls
  (e.g. `fetch`/`next.js route handlers`) or a `.env.local` with the
  backend's base URL.
