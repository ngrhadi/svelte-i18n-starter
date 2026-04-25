<script>
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';

	const newLocale = $derived(
		page.params.locale === 'en' ? 'id' : 'en'
	);

	const localizedPath = $derived(
		`/${newLocale}${
			page.url.pathname.replace(/^\/(en|id)/, '') || '/'
		}`
	);
</script>

<header class="header bg-gray-300">
	<div class="flex p-4 flex-row justify-between items-center">
		<nav class="flex flex-row gap-4">
			<a
				href={`/${page.params.locale}`}
				class={page.url.pathname === `/${page.params.locale}` ? 'font-bold' : ''}
			>
				{m.nav_home()}
			</a>

			<a
				href={`/${page.params.locale}/about`}
				class={page.url.pathname === `/${page.params.locale}/about` ? 'font-bold' : ''}
			>
				{m.nav_about()}
			</a>

		</nav>

		<div class="lang-switcher">
			<a href={localizedPath} class="{`${page.params.locale === 'id' ? 'font-bold' : ''}`}">
                ID
			</a>
			<a href={localizedPath} class="{`${page.params.locale === 'en' ? 'font-bold' : ''}`}">
				EN
			</a>
		</div>

	</div>
</header>
