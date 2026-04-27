<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref, setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
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
	<title>{m.seo_site_name()}</title>
	<meta name="description" content={m.seo_home_desc()} />
	{#each locales as loc (loc)}
		<link
			rel="alternate"
			hreflang={loc}
			href="{page.url.origin}{resolve(localizeHref(page.url.pathname, { locale: loc }) as Pathname)}"
		/>
	{/each}
	<link
		rel="alternate"
		hreflang="x-default"
		href="{page.url.origin}{resolve(localizeHref(page.url.pathname, { locale: 'en' }) as Pathname)}"
	/>
</svelte:head>

{@render children()}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>
			{locale}
		</a>
	{/each}
</div>
