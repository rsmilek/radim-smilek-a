---
mode: 'agent'
description: 'Migrate React SPA to Angular 22 – personal presentation page'
---

# React → Angular 22 Migration: Personal Presentation SPA

## Context

You are an expert Angular developer. Migrate the existing React SPA located at
`C:\Work\Projects\radim-smilek` into a brand-new Angular application.
The app is a personal presentation page. Follow every instruction below precisely.

---

## Tech Stack & Setup

| Concern | Requirement |
|---|---|
| Framework | Angular 22 — **standalone components only** (no NgModules) |
| UI Library | Angular Material **M3**, pre-built **`azure-blue`** theme |
| Routing | Angular Router — lazy-loaded routes where beneficial |
| State | Angular **Signals** where reactive state is needed |
| Fonts | Roboto served from local `node_modules` bundle (e.g. `fontsource`) — **no CDN** |
| Icons | All icons **inlined as SVG** — **no CDN**, no external requests |

---

## Page Architecture — Single Scrollable Page

The result must be a **single scrollable page**.
Scrolling top-to-bottom moves between sections; the active nav item updates accordingly.

Migrate **only** these five components — no others:

| Section | Source file |
|---|---|
| Home | `home.tsx` |
| About Me | `aboutMe.tsx` |
| Skills | `skills.tsx` |
| Portfolio | `portfolio.tsx` |
| Contact | `contactMe.tsx` |

---

## Navigation — Implement from Scratch (Angular Way)

> ⚠️ Do NOT port the React navigation component. Build it the Angular way.

### A — Scroll-spy
Use `IntersectionObserver` (or Angular CDK `ScrollDispatcher`) to detect
the section currently visible and update the active nav item reactively via Signals.

### B — Active item style
Active item: **bold** font-weight + **underlined**.

### C — Responsive / Hamburger menu
- **Large screens:** horizontal nav bar
- **Small screens:** hamburger icon → Angular Material `MatSidenav` drawer

### D — Theme toggle (last nav item)
- Implemented the Angular way — no React code ported
- Toggles **light ↔ dark** using Angular Material theming API
- **Light mode** → inlined SVG **sun icon**
- **Dark mode** → inlined SVG **moon icon**
- Persist preference in `localStorage`

---

## Component Migration Rules

### A — `Home` component
- Migrate content and layout from `home.tsx`
- Must be **full-viewport** on load: `height: 100dvh; width: 100%` — no overflow visible

### B — Animations (general rule)
Re-implement all **GSAP animations** from React using **`@angular/animations`**.
This rule applies to **all components except `Skills`** (see below).

### C — `Skills` component — Two animation versions

Create two separate standalone components for Skills:

#### Version 1 — `@angular/animations`
- File/selector hint: `skills-angular` (or similar)
- Re-implement all Skills animations with `@angular/animations`
  triggers, `query()`, `stagger()`, `animate()`
- Mark with comment: `// Angular Animations version`

#### Version 2 — GSAP
- File/selector hint: `skills-gsap` (or similar)
- Preserve as much **original GSAP code** from `skills.tsx` as possible
- Use the **same GSAP version** as in the original `package.json`
- Mark with comment: `// GSAP version`

#### ⚠️ Navigation integration
The router and navigation must link **only Version 1** (`@angular/animations`).
The GSAP version exists as an alternative but is **not routed or linked**.

---

## General Quality Requirements

- All components **standalone** with correct `imports` arrays
- Use `inject()` over constructor injection; use `input()` / `output()` signal APIs
- No `any` types — full TypeScript typing throughout
- One folder per feature/section (e.g. `src/app/features/home/`, `src/app/features/skills/`)
- Add a `README.md` documenting:
  - General app description
  - General architecture overview
  - How to install, build and serve
  - How to publish to Azure Static Web Apps
