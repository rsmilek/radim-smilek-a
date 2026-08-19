# Radim Smílek — Personal Portfolio SPA

Angular 22 migration of the original React/Gatsby personal presentation site.

---

## General Description

Single-scrollable-page personal portfolio for Radim Smílek — software developer.  
Sections: **Home · About Me · Skills · Portfolio · Contact**.

---

## Architecture Overview

```
src/
├── app/
│   ├── core/
│   │   ├── theme.service.ts        # Light/dark mode — persisted in localStorage
│   │   └── scroll-spy.service.ts   # IntersectionObserver scroll-spy → active nav item
│   ├── features/
│   │   ├── home/         home.ts               # Full-viewport hero with Angular animations
│   │   ├── about-me/     about-me.ts           # Profile section with Angular animations
│   │   ├── skills/
│   │   │   ├── skills-angular.ts  # Angular Animations version (routed)
│   │   │   └── skills-gsap.ts     # GSAP version (alternative, not routed)
│   │   ├── portfolio/    portfolio.ts           # Image grid with Angular animations
│   │   └── contact/      contact.ts            # Contact form + social links
│   ├── layout/
│   │   └── navigation/   navigation.ts         # Toolbar + sidenav + scroll-spy + theme toggle
│   ├── shared/
│   │   └── icons/        icons.ts              # All SVGs inlined as TS string constants
│   ├── app.ts            # Root component
│   ├── app.html          # App shell template
│   ├── app.config.ts     # ApplicationConfig (provideAnimationsAsync, provideHttpClient)
│   └── app.routes.ts     # Empty — single-page scroll, no routes
├── styles.scss            # Material M3 azure-blue theme + Roboto fontsource
public/assets/
├── images/                # Profile photo, portfolio screenshots, background
└── icons/                 # SVG source files (skills/, social/)
```

### Key design decisions

| Concern | Approach |
|---|---|
| Framework | Angular 22, standalone components only |
| UI | Angular Material M3 with `azure-blue` palette |
| Routing | No routes — single scroll page |
| Reactive state | Angular Signals (`signal`, `computed`, `effect`) |
| Fonts | Roboto via `@fontsource/roboto` (no CDN) |
| Icons | All SVGs inlined as TypeScript string constants, rendered via `[innerHTML]` + `DomSanitizer` |
| Scroll-spy | `IntersectionObserver` wrapped in `ScrollSpyService` |
| Theme | `ThemeService` toggles `dark-theme` class on `<html>`; persists to `localStorage` |

---

## Installation

```bash
npm install
```

---

## Serve (development)

```bash
npm start
# or
ng serve
```

Opens at `http://localhost:4200`.

---

## Build (production)

```bash
npm run build
# or
ng build
```

Output is written to `dist/radim-smilek-a/`.

---

## Publish to Azure Static Web Apps

### Option A — GitHub Actions (recommended)

1. Create an **Azure Static Web Apps** resource in the [Azure Portal](https://portal.azure.com).
2. Link it to this GitHub repository.
3. Azure generates a workflow file (`.github/workflows/azure-static-web-apps-*.yml`) automatically.
4. Add `staticwebapp.config.json` at the project root:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/*.{ico,png,jpg,webp,svg,css,js}"]
  }
}
```

5. Push to the default branch — the GitHub Action builds and deploys automatically.

### Option B — Azure Static Web Apps CLI

```bash
npm install -g @azure/static-web-apps-cli

# Build first
npm run build

# Deploy
swa deploy dist/radim-smilek-a/browser \
  --app-name <your-static-web-app-name> \
  --resource-group <your-resource-group>
```


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
