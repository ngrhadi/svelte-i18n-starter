# Protected Routes — Auth Guards

## Minimal Pattern (already shown in SKILL.md)

The three files that implement a protected route group:

1. `hooks.server.ts` → populates `event.locals.user`
2. `[locale]/(protected)/+layout.server.ts` → redirects if `!locals.user`
3. `app.d.ts` → types `App.Locals` and `App.PageData`

---

## Role-Based Guard

When some protected routes need roles (e.g., admin-only):

```typescript
// src/routes/[locale]/(admin)/+layout.server.ts
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
  if (!locals.user) throw redirect(302, `/${params.locale}/login`);
  if (locals.user.role !== 'admin') throw error(403, 'Forbidden');
  return { user: locals.user };
};
```

Directory structure for multiple groups:

```
[locale]/
  (public)/           # no guard
  (protected)/        # any logged-in user
  (admin)/            # locals.user.role === 'admin'
```

---

## Redirect-Out Guard (Auth Pages)

Prevent logged-in users from seeing login/signup:

```typescript
// src/routes/[locale]/(auth)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, params }) => {
  if (locals.user) {
    throw redirect(302, `/${params.locale}/dashboard`);
  }
};
```

---

## Client-Side Reactive Check

For extra UX (not a security boundary — server guard is the real check):

```svelte
<script lang="ts">
  import { page } from '$app/state';

  // page.data.user is passed down from layout.server.ts
  const user = $derived(page.data.user);
</script>

{#if user}
  <a href="/{page.params.locale}/dashboard">Dashboard</a>
{:else}
  <a href="/{page.params.locale}/login">Login</a>
{/if}
```

Never rely on client-side checks alone — they are bypassable. The
`+layout.server.ts` redirect is the enforced gate.

---

## Session Cookie Setup

Minimal session cookie pattern (use a real library like `lucia` for prod):

```typescript
// src/lib/server/session.ts
import type { RequestEvent } from '@sveltejs/kit';

export function setSession(event: RequestEvent, userId: string) {
  const token = crypto.randomUUID();
  // store token → userId in DB here
  event.cookies.set('session', token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearSession(event: RequestEvent) {
  event.cookies.delete('session', { path: '/' });
}
```

---

## Full app.d.ts Augmentation

```typescript
// src/app.d.ts
declare global {
  namespace App {
    interface Locals {
      user: {
        id: string;
        email: string;
        role: 'user' | 'admin';
      } | null;
    }
    interface PageData {
      user?: App.Locals['user'];
    }
    // interface Error {}
    // interface Platform {}
  }
}

export {};
```

---

## Checklist When Adding a Protected Route

- [ ] Route is inside a `(protected)` group (or a role-specific group)
- [ ] That group has a `+layout.server.ts` with the redirect
- [ ] `hooks.server.ts` sets `locals.user` before the guard runs
- [ ] `app.d.ts` types `Locals.user` (avoids TS errors in load functions)
- [ ] Login page is in `(auth)` group with redirect-out guard
- [ ] Sensitive data is fetched in `+page.server.ts`, not `+page.ts`
