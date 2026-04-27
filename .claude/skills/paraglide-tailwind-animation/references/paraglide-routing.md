# Paraglide Routing — Deep Reference

## How the locale pipeline works

```
Request: GET /id/demo
  │
  ├─ hooks.server.ts  →  Paraglide middleware
  │                       extracts locale "id" from URL
  │                       sets it in request context
  │
  ├─ hooks.ts  →  custom reroute()
  │               strips /id prefix for SvelteKit routing
  │               SvelteKit sees: /demo
  │
  └─ [locale]/+layout.ts  →  validates param
                              invalid locale → redirect /en
```

**Key files:**
- `src/hooks.server.ts` — Paraglide server middleware
- `src/hooks.ts` — `reroute` strips locale prefix
- `src/routes/[locale]/+layout.ts` — locale validation + redirect

## Supported locales

Currently: `en`, `id`

To add a new locale:
1. Add `messages/xx.json` with all keys from `messages/en.json`
2. Update Paraglide config (check `project.inlang/`)
3. Update the `'en' | 'id'` union type in locale-switch helpers

## Message key conventions (this project)

| Prefix       | Category                       |
| ------------ | ------------------------------ |
| `nav_`       | Navigation labels              |
| `hero_`      | Landing page hero section      |
| `feature_`   | Feature cards                  |
| `footer_`    | Footer links                   |
| `about_`     | About page content             |
| `cta_`       | Call-to-action buttons         |
| `tech_`      | Tech stack list                |

## localizeHref vs switchLocale

```typescript
// localizeHref — appends current locale to any path
localizeHref('/demo')   // → '/en/demo' (based on current locale)

// switchLocale — explicit locale override (used in language switcher)
function switchLocale(locale: 'en' | 'id') {
  const path = page.url.pathname.replace(/^\/(en|id)/, '');
  return `/${locale}${path}`;
}
```

Use `localizeHref` for internal links. Use `switchLocale` only in a language switcher UI.

## Runtime exports from `$lib/paraglide/runtime.js`

| Export          | Type       | Purpose                              |
| --------------- | ---------- | ------------------------------------ |
| `locales`       | string[]   | `['en', 'id']`                       |
| `localizeHref`  | function   | Prepend locale to a path             |
| `deLocalizeUrl` | function   | Strip locale from a URL              |
| `getTextDirection` | function | `'ltr'` or `'rtl'` for current locale |

## Common mistakes

```typescript
// ❌ Hard-coded locale in links
<a href="/en/about">About</a>

// ✅ Use localizeHref so it adapts to current locale
import { localizeHref } from '$lib/paraglide/runtime';
<a href={localizeHref('/about')}>About</a>

// ❌ Editing generated files
// src/lib/paraglide/messages/en.js  — DO NOT TOUCH

// ✅ Edit source message files
// messages/en.json  ← edit here
```
