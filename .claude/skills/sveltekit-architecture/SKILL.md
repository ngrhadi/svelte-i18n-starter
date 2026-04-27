---
name: sveltekit-architecture
description: Project-specific SvelteKit 5 architecture guide. Covers route layout under [locale], protected routes with server hooks, modular lib structure (ui/, stores/, server/, utils/), and naming conventions. Use when scaffolding routes, adding guards, or structuring new features.
---

# SvelteKit 5 Architecture — Project Blueprint

## Directory Tree

```
src/
├── app.d.ts                    # Augment App.Locals, App.PageData, App.PageState
├── app.html                    # Shell: %paraglide.lang%, %paraglide.dir%
├── hooks.server.ts             # Locale + auth guard (runs every request)
├── hooks.ts                    # Client reroute (strips locale prefix)
├── routes/
│   ├── +layout.svelte          # Root shell (fonts, global CSS import)
│   ├── +page.ts                # redirect(302, '/en')
│   └── [locale]/               # ← ALL user-facing routes live here
│       ├── +layout.ts          # Validate locale param, expose to data
│       ├── +layout.svelte      # setLocale($effect), <slot />
│       ├── +page.svelte        # Landing /en
│       ├── about/
│       │   └── +page.svelte
│       └── (protected)/        # Route group — adds auth guard
│           ├── +layout.server.ts  # Reads locals.user → redirect to /en/login
│           ├── dashboard/
│           │   └── +page.svelte
│           └── settings/
│               └── +page.svelte
└── lib/
    ├── index.ts                # Re-export public surface only
    ├── paraglide/              # ⚠ AUTO-GENERATED — never edit
    ├── ui/                     # Page-level & shared components
    ├── components/             # Primitive/reusable UI pieces
    ├── stores/                 # Shared $state / context providers
    ├── server/                 # Server-only helpers (db, auth, email)
    ├── utils/                  # Pure functions, no side effects
    └── assets/                 # Images, fonts, SVG
```

---

## Route Groups — Pattern

```
[locale]/
  (public)/             # No guard — landing, about, blog
  (protected)/          # +layout.server.ts checks locals.user
  (auth)/               # login, signup — redirect OUT if already authed
```

Route groups `(name)` do NOT affect the URL. They let you apply a layout
(and guard) to a subset of routes without adding a path segment.

---

## Locale Flow (brief)

```
Request /id/dashboard
  → hooks.server.ts    paraglideMiddleware → extract locale "id"
  → [locale]/+layout.ts   validate locale, pass to data
  → [locale]/+layout.svelte   $effect(() => setLocale(locale))
```

See [references/routing-patterns.md](references/routing-patterns.md) for
full hook implementation, locale redirect logic, and `reroute` client hook.

---

## Protected Route Pattern

**`hooks.server.ts`** — populate `locals.user` from session/cookie:

```typescript
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');
  event.locals.user = session ? await getUserFromSession(session) : null;
  return resolve(event);
};
```

**`[locale]/(protected)/+layout.server.ts`** — enforce the guard:

```typescript
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, params }) => {
  if (!locals.user) {
    throw redirect(302, `/${params.locale}/login`);
  }
  return { user: locals.user };
};
```

**`app.d.ts`** — type the locals:

```typescript
declare global {
  namespace App {
    interface Locals {
      user: { id: string; email: string } | null;
    }
    interface PageData {
      user?: App.Locals['user'];
    }
  }
}
```

See [references/protected-routes.md](references/protected-routes.md) for
role-based guards, client-side reactive checks, and CSR redirect patterns.

---

## Lib Structure Rules

| Folder         | Contents                              | Import from outside? |
| -------------- | ------------------------------------- | -------------------- |
| `ui/`          | Full-section Svelte components        | Yes                  |
| `components/`  | Primitive UI (Button, Input, Card)    | Yes                  |
| `stores/`      | `$state` context providers, writable  | Yes                  |
| `server/`      | DB queries, email, session logic      | **Server only**      |
| `utils/`       | Pure TS functions (formatting, math)  | Yes                  |
| `paraglide/`   | Auto-generated i18n — **never edit**  | Yes (messages only)  |

Always re-export from `$lib/index.ts` only what consumers need. Keep
`server/` imports inside `+page.server.ts` / `+layout.server.ts` only —
SvelteKit will error if server code leaks to the client bundle.

See [references/lib-structure.md](references/lib-structure.md) for naming
conventions, barrel export patterns, and feature-slice organization.

---

## Naming Conventions

| Thing               | Convention         | Example                        |
| ------------------- | ------------------ | ------------------------------ |
| Components          | PascalCase         | `UserCard.svelte`              |
| Pages               | SvelteKit file     | `+page.svelte`                 |
| Route params        | kebab-case         | `[user-id]`                    |
| Stores / state file | camelCase          | `authStore.ts`                 |
| Server util         | camelCase          | `getUserById.ts`               |
| i18n message keys   | snake_case         | `nav_home`, `hero_cta`         |
| CSS tokens          | kebab prefix       | `--bg-1`, `--fg-2`, `--link`   |

---

## Quick Checklist

- New route? → put under `[locale]/`, add to correct route group
- Needs auth? → add `+layout.server.ts` to route group, check `locals.user`
- New text? → add to `messages/en.json` + `messages/id.json`, use `m.key()`
- New shared component? → `lib/ui/` (section) or `lib/components/` (primitive)
- DB / session logic? → `lib/server/` only, never import in client components
- New CSS color? → add to `layout.css` as `--token`, use `var(--token)` in component
