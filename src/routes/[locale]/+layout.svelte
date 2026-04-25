<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref, setLocale } from '$lib/paraglide/runtime';
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	$effect(() => {
		const locale = page.params.locale as 'en' | 'id';

		if (locale) {
			setLocale(locale);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>
			{locale}
		</a>
	{/each}
</div>
