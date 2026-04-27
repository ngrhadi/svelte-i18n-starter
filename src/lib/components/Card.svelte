<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		interactive = false,
		class: className = '',
	}: {
		children: Snippet;
		interactive?: boolean;
		class?: string;
	} = $props();
</script>

<div
	role={interactive ? 'button' : undefined}
	tabindex={interactive ? 0 : undefined}
	class="rounded-xl border border-[var(--fg-1)]/10 bg-[var(--bg-2,var(--bg-1))] transition-all duration-300
	       {interactive ? 'group cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--link)]/30' : ''}
	       {className}"
>
	{@render children()}
</div>
