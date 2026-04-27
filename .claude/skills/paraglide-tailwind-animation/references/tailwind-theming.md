# Tailwind v4 + CSS Custom Properties — Deep Reference

## How theming works in this project

Tailwind v4 handles utility classes. Theming (light/dark) is handled entirely
via CSS custom properties on `<html>`. The two systems complement each other:

- Use **Tailwind utilities** for spacing, layout, typography, responsive
- Use **CSS vars** (`var(--token)`) for all color and theme-sensitive values
- Toggle dark mode by adding/removing `.dark` class on `<html>` (not Tailwind's `dark:`)

## Full token reference

| Token          | Light                         | Dark                          |
| -------------- | ----------------------------- | ----------------------------- |
| `--bg-1`       | `hsl(0, 0%, 100%)`            | `hsl(0, 0%, 18%)`             |
| `--bg-2`       | `hsl(206, 20%, 90%)`          | `hsl(0, 0%, 30%)`             |
| `--bg-3`       | `hsl(206, 20%, 80%)`          | `hsl(0, 0%, 40%)`             |
| `--navbar-bg`  | `#fff`                        | `hsl(220, 14%, 16%)`          |
| `--fg-1`       | `hsl(0, 0%, 13%)`             | `hsl(0, 0%, 75%)`             |
| `--fg-2`       | `hsl(0, 0%, 50%)`             | `hsl(0, 0%, 40%)`             |
| `--fg-3`       | `hsl(0, 0%, 60%)`             | `hsl(0, 0%, 30%)`             |
| `--link`       | `hsl(208, 77%, 47%)`          | `hsl(206, 96%, 72%)`          |
| `--border-radius` | `4px`                      | _(same)_                      |
| `--font`       | system font stack             | _(same)_                      |

## Dark mode toggle pattern

Dark mode is stored in `localStorage` and applied by toggling `html.dark`:

```typescript
// Reading
const isDark = document.documentElement.classList.contains('dark');

// Toggling
document.documentElement.classList.toggle('dark');
localStorage.setItem('theme', isDark ? 'light' : 'dark');

// Restoring on load (in app.html <head> or onMount)
const saved = localStorage.getItem('theme');
if (saved === 'dark') document.documentElement.classList.add('dark');
```

## Patterns: CSS vars + Tailwind together

```svelte
<!-- Pure CSS var — works in any context -->
<div style="background: var(--bg-1); color: var(--fg-1)">...</div>

<!-- Tailwind layout + CSS var color -->
<nav class="flex items-center justify-between px-10 h-14"
     style="background: var(--navbar-bg)">...</nav>

<!-- Scoped Svelte CSS for theme-aware component styles -->
<style>
  .card {
    background: var(--bg-2);
    border-radius: var(--border-radius);
    color: var(--fg-1);
  }
</style>

<!-- ❌ Tailwind dark: prefix — NOT configured in this project -->
<div class="dark:bg-gray-800 dark:text-white">...</div>
```

## Tailwind v4 config (CSS-first, no tailwind.config.js)

```css
/* src/routes/layout.css */
@import 'tailwindcss';
@plugin '@tailwindcss/forms';     /* form element reset + styling */
@plugin '@tailwindcss/typography'; /* prose class for rich text */
```

No `tailwind.config.js` file — Tailwind v4 is configured entirely in CSS.
The Vite plugin (`@tailwindcss/vite`) is already registered in `vite.config.ts`.

## Adding a new CSS var token

1. Add the token to both sections in `src/routes/layout.css`:
   ```css
   html { --my-token: value; }
   html.dark { --my-token: dark-value; }
   ```
2. Use it in components: `var(--my-token)`
3. Do NOT add it to `PlaygroundLayout.svelte` (that file's CSS is for the playground only)

## Common mistakes

```svelte
<!-- ❌ Hard-coded color — breaks dark mode -->
<div style="background: white; color: #222">...</div>

<!-- ✅ CSS var — adapts to theme -->
<div style="background: var(--bg-1); color: var(--fg-1)">...</div>

<!-- ❌ Trying to use Tailwind dark: prefix -->
<div class="bg-white dark:bg-zinc-900">...</div>

<!-- ✅ CSS vars handle this automatically -->
<div style="background: var(--bg-1)">...</div>
```
