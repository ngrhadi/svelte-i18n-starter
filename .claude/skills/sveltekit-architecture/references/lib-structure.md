# Lib Structure — Modular Organization

## Folder Responsibilities

### `lib/ui/` — Page-Level Components

Full page sections, complex layouts with Tailwind + CSS vars. Can import
from `lib/stores/`, `lib/utils/`, and Paraglide messages.

```
lib/ui/
  Header.svelte         # Nav + locale switcher
  Footer.svelte
  LandingPage.svelte    # Hero + features sections
  ErrorBoundary.svelte
```

### `lib/components/` — Primitive UI

Stateless or lightly-stateful atoms: Button, Input, Card, Badge, Modal.
Should have no knowledge of routes, locale, or auth state.

```
lib/components/
  Button.svelte
  Input.svelte
  Card.svelte
  Modal.svelte
  Toast.svelte
```

### `lib/stores/` — Shared State

Svelte 5 `$state` wrapped in context providers or module-level exports.
No direct DOM access or routing imports here.

```typescript
// lib/stores/toast.svelte.ts
let toasts = $state<{ id: string; message: string }[]>([]);

export function addToast(message: string) {
  const id = crypto.randomUUID();
  toasts.push({ id, message });
  setTimeout(() => removeToast(id), 3000);
}

export function removeToast(id: string) {
  const i = toasts.findIndex((t) => t.id === id);
  if (i !== -1) toasts.splice(i, 1);
}

export { toasts };
```

### `lib/server/` — Server-Only Code

DB queries, session helpers, email senders. **Never import in client files.**
SvelteKit enforces this at build time — importing `$lib/server/*` in a
non-server file throws an error.

```
lib/server/
  db.ts           # DB client singleton (drizzle/prisma)
  session.ts      # Cookie session helpers
  user.ts         # getUserById, getUserByEmail
  email.ts        # sendVerificationEmail
```

```typescript
// lib/server/user.ts
import { db } from './db';

export async function getUserFromSession(token: string) {
  return db.query.sessions.findFirst({
    where: (s, { eq }) => eq(s.token, token),
    with: { user: true },
  });
}
```

### `lib/utils/` — Pure Functions

No Svelte, no SvelteKit, no DOM. Just data transformations, formatters,
validators. Importable anywhere including server.

```
lib/utils/
  format.ts       # formatDate, formatPrice, truncate
  validate.ts     # isEmail, isStrongPassword
  url.ts          # buildSearchParams, parseLocale
```

---

## Feature-Slice Option

For large features (e.g., a full "blog" module), co-locate by feature:

```
lib/
  blog/
    components/   # BlogCard, BlogList
    server/       # getBlogPost, listPosts (server-only)
    utils/        # parseMarkdown, slugify
    stores/       # currentPost store
    index.ts      # public API of the feature
```

Import via `$lib/blog` (uses `index.ts`). This prevents cross-feature
spaghetti — other features only use the public API.

---

## Barrel Export Pattern

**`lib/index.ts`** — only export what consumers outside `lib/` need:

```typescript
// lib/index.ts — public surface
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';
export { addToast, toasts } from './stores/toast.svelte';
export * from './utils/format';
// ❌ Do NOT export server/ here
```

Keep server code imports inside `+page.server.ts` and `+layout.server.ts`
only, never through the barrel.

---

## Import Rules Summary

| From                      | Can import                       |
| ------------------------- | -------------------------------- |
| `+page.svelte`            | `$lib/ui`, `$lib/components`, `$lib/stores`, `$lib/utils` |
| `+page.server.ts`         | All of the above + `$lib/server` |
| `+layout.server.ts`       | All of the above + `$lib/server` |
| `lib/server/*`            | Only other `lib/server/*` and `lib/utils/*` |
| `lib/components/*`        | Only `lib/utils/*` |

Violating the server boundary causes a build error — SvelteKit detects it
automatically when `$lib/server` is imported in a client file.
