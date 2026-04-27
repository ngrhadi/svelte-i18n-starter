---
name: paraglide-tailwind-animation
description: Project-specific patterns for this SvelteKit app. Covers Paraglide i18n routing under [locale], Tailwind v4 with CSS-var theming (not dark: prefix), and Svelte 5 transitions/easing. Use when touching i18n, themes, or animations.
---

# Paraglide + Tailwind + Svelte Animation — Project Patterns

## Stack Snapshot

| Layer       | Tech                             | Config                            |
| ----------- | -------------------------------- | --------------------------------- |
| i18n        | `@inlang/paraglide-js`           | `messages/en.json`, `messages/id.json` |
| Routing     | `[locale]` dynamic segment       | `src/routes/[locale]/`            |
| CSS         | Tailwind v4 + CSS custom props   | `src/routes/layout.css`           |
| Dark mode   | `html.dark` class (NOT `dark:`)  | toggled via `localStorage`        |
| Animations  | `svelte/transition` + `svelte/easing` | see `src/lib/playground/`    |

---

## Paraglide — i18n

### Message usage
```typescript
import { m } from '$lib/paraglide/messages.js';
// Usage in template:
m.hero_title()           // → "Premium Audio Experience"
m.hello_world({ name })  // → "Hello, {name} from en!"
```

**NEVER edit files in `src/lib/paraglide/`** — they are auto-generated. Edit `/messages/en.json` or `/messages/id.json` instead.

### Locale routing
```
/en/about   → src/routes/[locale]/about/+page.svelte
/id/demo    → src/routes/[locale]/demo/+page.svelte
```

Locale is validated in `src/routes/[locale]/+layout.ts`. Invalid locale → redirects to `/en`.

### Locale switching
```typescript
import { page } from '$app/state';
import { localizeHref } from '$lib/paraglide/runtime';

// Strip and reattach locale
function switchLocale(locale: 'en' | 'id') {
  const path = page.url.pathname.replace(/^\/(en|id)/, '');
  return `/${locale}${path}`;
}
```

### Adding a new message
1. Add key to `messages/en.json` and `messages/id.json`
2. Use `m.key_name()` — Paraglide Vite plugin auto-regens on save
3. See [references/paraglide-routing.md](references/paraglide-routing.md) for reroute hook details

---

## Tailwind v4 — Theming

### CSS entry point
```css
/* src/routes/layout.css */
@import 'tailwindcss';
@plugin '@tailwindcss/forms';
@plugin '@tailwindcss/typography';
```

### CSS custom properties (the theming system)
```css
/* Light (default) */
html { --bg-1: hsl(0,0%,100%); --fg-1: hsl(0,0%,13%); --link: hsl(208,77%,47%); }

/* Dark */
html.dark { --bg-1: hsl(0,0%,18%); --fg-1: hsl(0,0%,75%); --link: hsl(206,96%,72%); }
```

Full token list: `--bg-1/2/3`, `--fg-1/2/3`, `--navbar-bg`, `--link`, `--border-radius`, `--font`

### Dark mode rule
```svelte
<!-- ✅ Use CSS vars — they flip automatically with html.dark -->
<div style="background: var(--bg-1); color: var(--fg-1)">...</div>

<!-- ✅ class: directive with CSS var -->
<div class="rounded-[var(--border-radius)]">...</div>

<!-- ❌ WRONG in this project — Tailwind dark: prefix is NOT configured -->
<div class="dark:bg-gray-800">...</div>
```

Dark mode is toggled by adding/removing `.dark` on `<html>` and persisted to `localStorage`.

See [references/tailwind-theming.md](references/tailwind-theming.md) for full token reference and theming patterns.

---

## Svelte Transitions & Easing

### Transition basics (Svelte 5)
```svelte
<script>
  import { fade, fly, slide, scale } from 'svelte/transition';
  import { cubicOut, elasticOut } from 'svelte/easing';

  let visible = $state(false);
</script>

{#if visible}
  <div transition:fly={{ y: 20, duration: 300, easing: cubicOut }}>
    Hello
  </div>
{/if}
```

### Directional in/out
```svelte
<div in:fly={{ y: -20, duration: 200 }} out:fade={{ duration: 150 }}>
  Content
</div>
```

### Animate (list reordering)
```svelte
<script>
  import { flip } from 'svelte/animate';
</script>

{#each items as item (item.id)}
  <div animate:flip={{ duration: 300 }}>...</div>
{/each}
```

### Available easings (`svelte/easing`)
`linear`, `sineIn/Out/InOut`, `quadIn/Out/InOut`, `cubicIn/Out/InOut`, `quartIn/Out/InOut`,
`quintIn/Out/InOut`, `expoIn/Out/InOut`, `circIn/Out/InOut`, `backIn/Out/InOut`,
`elasticIn/Out/InOut`, `bounceIn/Out/InOut`

See the easing playground at `/en/demo` — interactive visualizer is in `src/lib/playground/`.

See [references/animation-patterns.md](references/animation-patterns.md) for advanced patterns (deferred transitions, custom tweens, CSS-driven animations).

---

## Quick Checklist

- New text visible to users? → add to `messages/en.json` + `messages/id.json`, use `m.key()`
- New color/background? → use `var(--bg-1)` / `var(--fg-1)`, not hardcoded values
- Dark mode styling? → override via `html.dark { ... }` in CSS, **not** Tailwind `dark:` prefix
- Animation on mount? → `in:` directive or wrap in `{#if mounted}` with `onMount`
- List reorder animation? → `animate:flip` with a keyed `{#each}`
