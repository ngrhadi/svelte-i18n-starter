# Routing Patterns — Locale + Hooks

## hooks.server.ts — Full Pattern

Combines Paraglide middleware with auth session injection:

```typescript
import { paraglideMiddleware } from '$lib/paraglide/server';
import { redirect, type Handle } from '@sveltejs/kit';

const SUPPORTED_LOCALES = ['en', 'id'] as const;

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;

  // 1. Inject session into locals (runs before paraglide)
  const session = event.cookies.get('session');
  event.locals.user = session ? await getUserFromSession(session) : null;

  // 2. Locale redirect — bare paths without locale prefix
  const hasLocale = SUPPORTED_LOCALES.some((l) => pathname.startsWith(`/${l}`));
  if (!hasLocale && pathname !== '/') {
    throw redirect(302, `/en${pathname}`);
  }

  // 3. Paraglide — extracts locale, de-localizes URL, sets AsyncLocalStorage
  return paraglideMiddleware(event.request, ({ request }) =>
    resolve({ ...event, request })
  );
};
```

### What paraglideMiddleware does

1. Reads locale from URL (e.g., `/id/about` → locale `id`)
2. De-localizes URL for internal SvelteKit routing (`/id/about` → `/about`)
3. Injects locale into AsyncLocalStorage so `getLocale()` works server-side
4. Rewrites `%paraglide.lang%` and `%paraglide.dir%` in the HTML shell

---

## hooks.ts — Client Reroute

In this project the `[locale]` dynamic segment handles routing, so `reroute`
is not needed. If you add a custom reroute function, keep it lightweight — it
runs on every client navigation:

```typescript
import type { Reroute } from '@sveltejs/kit';

// Example: strip locale for internal matching (not needed with [locale] segment)
export const reroute: Reroute = ({ url }) => {
  // return a different pathname if needed
  return url.pathname;
};
```

---

## [locale]/+layout.ts — Locale Validation

```typescript
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

const LOCALES = ['en', 'id'] as const;
type Locale = (typeof LOCALES)[number];

export const load: LayoutLoad = ({ params }) => {
  if (!LOCALES.includes(params.locale as Locale)) {
    throw redirect(302, '/en');
  }
  return { locale: params.locale as Locale };
};
```

---

## [locale]/+layout.svelte — Locale Activation

```svelte
<script lang="ts">
  import { page } from '$app/state';
  import { setLocale } from '$lib/paraglide/runtime';

  $effect(() => {
    setLocale(page.params.locale as 'en' | 'id');
  });
</script>

{@render children()}
```

`setLocale` is called in `$effect` so it reacts to client-side navigations
that change the locale (e.g., `/en/about` → `/id/about`).

---

## Locale Switcher

```svelte
<script lang="ts">
  import { page } from '$app/state';

  const newLocale = $derived(page.params.locale === 'en' ? 'id' : 'en');
  const switchHref = $derived(() => {
    const path = page.url.pathname.replace(/^\/(en|id)/, '');
    return `/${newLocale}${path || '/'}`;
  });
</script>

<a href={switchHref()}>Switch to {newLocale.toUpperCase()}</a>
```

---

## Adding a New Locale

1. Add to `project.inlang/settings.json` → `"locales": ["en", "id", "fr"]`
2. Create `messages/fr.json` with all message keys
3. Update `LOCALES` arrays in `hooks.server.ts` and `[locale]/+layout.ts`
4. `npm run build` to regenerate `src/lib/paraglide/`
