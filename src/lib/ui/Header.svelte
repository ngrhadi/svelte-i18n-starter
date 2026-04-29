<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';

	const newLocale = $derived(page.params.locale === 'en' ? 'id' : 'en');
	const localizedPath = $derived(
		`/${newLocale}${page.url.pathname.replace(/^\/(en|id)/, '') || '/'}`
	);
	const user = $derived(page.data.user ?? null);
	const locale = $derived(page.params.locale);
</script>

<header class="header bg-gray-300">
	<div class="flex flex-row items-center justify-between p-4">
		<nav class="flex flex-row gap-4">
			<a
				href={`/${locale}`}
				class={page.url.pathname === `/${locale}` ? 'font-bold' : ''}
			>
				{m.nav_home()}
			</a>

			<a
				href={`/${locale}/about`}
				class={page.url.pathname === `/${locale}/about` ? 'font-bold' : ''}
			>
				{m.nav_about()}
			</a>

			{#if user}
				<a
					href={`/${locale}/dashboard`}
					class={page.url.pathname.includes('/dashboard') ? 'font-bold' : ''}
				>
					{m.nav_dashboard()}
				</a>
			{/if}
		</nav>

		<div class="flex items-center gap-4">
			{#if user}
				<span class="text-sm text-gray-600">{user.name}</span>
			{:else}
				<a
					href={`/${locale}/login`}
					class="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
				>
					{m.nav_login()}
				</a>
			{/if}

			<div class="lang-switcher">
				<a href={localizedPath} class={locale === 'id' ? 'font-bold' : ''}>ID</a>
				<a href={localizedPath} class={locale === 'en' ? 'font-bold' : ''}>EN</a>
			</div>
		</div>
	</div>
</header>
