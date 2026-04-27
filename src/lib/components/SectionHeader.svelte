<script lang="ts">
	let {
		title,
		subtitle,
		colorClass = 'text-[var(--fg-1)]',
		align = 'center',
		class: className = '',
	}: {
		title: string;
		subtitle?: string;
		colorClass?: string;
		align?: 'center' | 'left';
		class?: string;
	} = $props();
</script>

<div class="{align === 'center' ? 'text-center' : 'text-left'} {className}">
	<h2 class="text-3xl sm:text-4xl font-bold {colorClass}">{title}</h2>
	{#if subtitle}
		<p class="text-lg {colorClass} opacity-75 mt-4">{subtitle}</p>
	{/if}
</div>
