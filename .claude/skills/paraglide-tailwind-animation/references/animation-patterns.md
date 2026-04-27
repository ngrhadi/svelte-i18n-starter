# Svelte Animation & Transition Patterns — Deep Reference

## Svelte's animation APIs

| API                  | Import                 | Purpose                              |
| -------------------- | ---------------------- | ------------------------------------ |
| `fade`               | `svelte/transition`    | Opacity in/out                       |
| `fly`                | `svelte/transition`    | Slide + fade from direction          |
| `slide`              | `svelte/transition`    | Height collapse/expand               |
| `scale`              | `svelte/transition`    | Scale + fade                         |
| `blur`               | `svelte/transition`    | Blur + fade                          |
| `crossfade`          | `svelte/transition`    | Shared-element transition            |
| `flip`               | `svelte/animate`       | Animate list item reordering (FLIP)  |
| `tweened`            | `svelte/motion`        | Smoothly animated reactive value     |
| `spring`             | `svelte/motion`        | Spring-physics animated value        |
| All easings          | `svelte/easing`        | 30+ easing functions                 |

## Easing groups

```
linear
sine   In | Out | InOut
quad   In | Out | InOut
cubic  In | Out | InOut     ← cubicOut is the safe default
quart  In | Out | InOut
quint  In | Out | InOut
expo   In | Out | InOut
circ   In | Out | InOut
back   In | Out | InOut     ← slight overshoot
elastic In | Out | InOut    ← bouncy spring
bounce  In | Out | InOut    ← physical bounce
```

The easing playground at `/en/demo` shows interactive SVG curves for all of the above
(source: `src/lib/playground/`).

## Common transition patterns

### Fade on mount
```svelte
<script>
  import { fade } from 'svelte/transition';
  let visible = $state(true);
</script>
{#if visible}
  <div transition:fade={{ duration: 200 }}>...</div>
{/if}
```

### Fly in from bottom on mount (page sections)
```svelte
<script>
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
</script>
<div in:fly={{ y: 32, duration: 400, easing: cubicOut }}>...</div>
```

### Staggered list items
```svelte
<script>
  import { fly } from 'svelte/transition';
</script>
{#each items as item, i}
  <div in:fly={{ y: 16, duration: 300, delay: i * 60 }}>
    {item.title}
  </div>
{/each}
```

### Animated list reorder (FLIP)
```svelte
<script>
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
</script>
{#each items as item (item.id)}
  <div animate:flip={{ duration: 300 }} transition:fade>
    {item.name}
  </div>
{/each}
```
**Key requirement:** `(item.id)` keyed each block is required for `animate:flip`.

### Shared-element crossfade (tabs, modals)
```svelte
<script>
  import { crossfade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  const [send, receive] = crossfade({
    duration: 300,
    easing: quintOut,
    fallback: fade
  });
</script>

<!-- Source -->
<div out:send={{ key: 'card' }}>...</div>

<!-- Target -->
<div in:receive={{ key: 'card' }}>...</div>
```

### Tweened value (number counter, progress bar)
```svelte
<script>
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  const progress = tweened(0, { duration: 600, easing: cubicOut });

  function update() {
    progress.set(0.8); // animates from current value to 0.8
  }
</script>

<div style="width: {$progress * 100}%"></div>
```

### Spring (interactive drag/follow)
```svelte
<script>
  import { spring } from 'svelte/motion';

  const pos = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.25 });

  function move(e: MouseEvent) {
    pos.set({ x: e.clientX, y: e.clientY });
  }
</script>

<svelte:window onmousemove={move} />
<div style="transform: translate({$pos.x}px, {$pos.y}px)"></div>
```

## CSS-driven animations (when JS animation isn't needed)

For simple hover/focus effects, prefer pure CSS — no JS overhead:

```svelte
<style>
  .card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
</style>
```

For animations that need to respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}
```

## Svelte 5 runes + animations

Runes work seamlessly with transitions — the `{#if}` block drives in/out:

```svelte
<script>
  import { slide } from 'svelte/transition';

  let open = $state(false);
</script>

<button onclick={() => open = !open}>Toggle</button>
{#if open}
  <div transition:slide>Accordion content</div>
{/if}
```

`$derived` works fine as a transition parameter source:
```svelte
const duration = $derived(prefersReducedMotion ? 0 : 300);

<div in:fly={{ y: 20, duration }}>...</div>
```

## Easing playground integration

The project has a built-in easing visualizer. The easing data lives in
`src/lib/playground/eases.js` — it preprocesses all `svelte/easing` functions
into SVG path shapes for the visualization. Reference this file when building
custom visualizations or when you need the exact shape data for an easing curve.
