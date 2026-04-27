# Start Audio

Landing page untuk Start Audio — e-commerce headset premium. Dibangun dengan SvelteKit 5, Tailwind CSS v4, dan Paraglide i18n (EN/ID).

## Stack

- **SvelteKit 5** + Svelte 5 runes (`$state`, `$derived`, `$effect`)
- **Tailwind CSS v4** — theming via CSS custom properties, bukan `dark:` prefix
- **Paraglide** — i18n dengan locale di URL (`/en`, `/id`)
- **Vercel** — deployment via `@sveltejs/adapter-vercel`
- **Vitest** — unit test (Node) + browser component test (Playwright/Chromium)

## Mulai

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Perintah | Keterangan |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build produksi |
| `npm run preview` | Preview build lokal |
| `npm run check` | Svelte type-check |
| `npm run format` | Auto-format (Prettier) |
| `npm run lint` | Cek format saja |
| `npm run test` | Semua test (unit + browser) |

## Struktur Utama

```
src/
├── routes/
│   └── [locale]/          # Semua halaman di bawah prefix locale
│       ├── +page.svelte   # Landing page utama
│       ├── about/
│       └── demo/
├── lib/
│   ├── ui/                # Komponen UI (Header, Footer, LandingPage)
│   ├── playground/        # Komponen playground/demo
│   └── paraglide/         # Auto-generated — jangan diedit manual
└── hooks.server.ts        # Middleware Paraglide
```

## i18n

File pesan ada di `/messages/{locale}.json`. Edit file tersebut, bukan folder `$lib/paraglide/` yang di-generate otomatis.

```typescript
import { m } from '$lib/paraglide/messages';
m.visit()  // "Visit" (en) | "Kunjungi" (id)
```

## Deploy

Push ke branch `main` → auto-deploy ke Vercel. Pastikan environment variable sudah terkonfigurasi di dashboard Vercel.
