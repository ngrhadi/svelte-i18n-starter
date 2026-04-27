# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:5173
npm run build            # Build for production (Vercel adapter)
npm run preview          # Preview production build locally

# Type checking
npm run check            # Svelte type-check + diagnostics
npm run check:watch      # Watch mode

# Formatting
npm run format           # Auto-format with Prettier
npm run lint             # Check formatting only

# Testing
npm run test             # Run all tests (unit + browser component)
```

To run a single test file:
```bash
npx vitest run src/lib/vitest-examples/greet.spec.ts
```

## Architecture

### Routing & Locale Handling

All routes live under a dynamic `[locale]` segment (`/en`, `/id/demo/paraglide`). The root `/` redirects to `/en`.

- `src/hooks.server.ts` — Paraglide middleware extracts locale from URL and injects it into the request
- `src/hooks.ts` — Custom `reroute` function strips the locale prefix for internal SvelteKit routing
- `src/routes/[locale]/+layout.ts` — Validates the locale param; redirects invalid values to `/en`

### Internationalization (Paraglide)

Message sources live in `/messages/{locale}.json` (`en`, `id`). The Paraglide Vite plugin generates `/src/lib/paraglide/*` at build time — this directory is gitignored and must not be edited manually.

Usage pattern:
```typescript
import { m } from '$lib/paraglide/messages';
m.visit()  // → "Visit" (en) or "Kunjungi" (id)
```

`$lib/paraglide/runtime.js` exports `locales`, `localizeHref`, `deLocalizeUrl`, and `getTextDirection`.

### Testing

Vitest runs two projects configured in `vite.config.ts`:
- **Server**: Node environment for `.spec.ts` files
- **Client**: Playwright/Chromium browser environment for `.svelte.spec.ts` files

### Branch Strategy

- `main`, `master`, `staging`, dan `develop` adalah **protected branches** — jangan commit langsung ke sini
- Setiap task/fitur/bugfix harus menggunakan **branch baru** (`feat/`, `fix/`, `chore/`, dll.)
- Merge ke protected branch hanya melalui Pull Request
- Hapus branch setelah PR di-merge

### Key Conventions

- **Tabs, single quotes, 100-char line width** (Prettier — auto-enforced)
- **Svelte 5 runes** (`$state`, `$effect`) are used throughout; `runes: true` is forced in `svelte.config.js`
- **`$lib/paraglide/`** is auto-generated — edit `/messages/*.json` instead
- Theme (light/dark) is persisted to `localStorage` and toggled in `PlaygroundLayout.svelte`
- CSS custom properties (`--bg-1`, `--fg-1`, `--link`, etc.) drive theming rather than Tailwind dark mode
