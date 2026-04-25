<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { page } from '$app/state';
	import { localizeHref } from '$lib/paraglide/runtime';

	function switchLocale(locale: 'en' | 'id') {
		const path = page.url.pathname.replace(/^\/(en|id)/, '');
		return `/${locale}${path}`;
	}
</script>

<nav>
	<a href={switchLocale('en')}>en</a>
	<a href={switchLocale('id')}>id</a>
</nav>

<h1>{m.hello_world({ name: 'SvelteKit User' })}</h1>


<p>
	If you use VSCode, install the

	<a
		href="https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension"
		target="_blank">
		Sherlock i18n extension
	</a>

	for a better i18n experience.
</p>
