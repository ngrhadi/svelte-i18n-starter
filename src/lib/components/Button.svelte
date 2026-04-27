<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		variant = 'primary',
		size = 'md',
		onclick,
		class: className = '',
		children,
	}: {
		variant?: 'primary' | 'white';
		size?: 'md' | 'lg';
		onclick?: () => void;
		class?: string;
		children: Snippet;
	} = $props();

	const variants = {
		primary: 'bg-[var(--link)] text-white',
		white: 'bg-white text-indigo-600',
	};

	const sizes = {
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-base',
	};
</script>

<button
	class="font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300
	       {variants[variant]} {sizes[size]} {className}"
	{onclick}
>
	{@render children()}
</button>
