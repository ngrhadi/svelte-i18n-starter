<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Footer from '$lib/ui/Footer.svelte';
	import { m } from '$lib/paraglide/messages';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { localizeHref } from '$lib/paraglide/runtime';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';

	const ogLocale = $derived(page.params.locale === 'id' ? 'id_ID' : 'en_US');

	const features = $derived([
		{ label: m.feature_easing(), icon: '🎛️' },
		{ label: m.feature_i18n(), icon: '🌐' },
		{ label: m.feature_responsive(), icon: '📱' },
	]);

	const techs = $derived([
		{ label: m.tech_svelte(), icon: '⚡' },
		{ label: m.tech_tailwind(), icon: '🎨' },
		{ label: m.tech_paraglide(), icon: '🌍' },
		{ label: m.tech_vite(), icon: '🔧' },
	]);
</script>

<svelte:head>
	<title>{m.seo_about_title()}</title>
	<meta name="description" content={m.seo_about_desc()} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={m.seo_site_name()} />
	<meta property="og:title" content={m.seo_about_title()} />
	<meta property="og:description" content={m.seo_about_desc()} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:locale" content={ogLocale} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={m.seo_about_title()} />
	<meta name="twitter:description" content={m.seo_about_desc()} />
	<link rel="canonical" href={page.url.href} />
</svelte:head>

<Header />

<main class="max-w-4xl mx-auto px-4 py-16 sm:py-24">
	<div class="mb-16">
		<h1 class="text-4xl sm:text-5xl font-bold text-[var(--fg-1)] mb-4">{m.about_title()}</h1>
		<p class="text-lg text-[var(--fg-2)] leading-relaxed max-w-2xl">{m.about_desc()}</p>
	</div>

	<section class="mb-16">
		<SectionHeader title={m.about_features()} align="left" class="mb-8" />
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			{#each features as feature}
				<Card class="p-5 flex items-start gap-3">
					<span class="text-2xl">{feature.icon}</span>
					<p class="text-[var(--fg-1)] leading-snug">{feature.label}</p>
				</Card>
			{/each}
		</div>
	</section>

	<section class="mb-16">
		<SectionHeader title={m.about_tech()} align="left" class="mb-8" />
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{#each techs as tech}
				<Card class="p-5 flex items-center gap-3">
					<span class="text-2xl">{tech.icon}</span>
					<p class="text-[var(--fg-1)]">{tech.label}</p>
				</Card>
			{/each}
		</div>
	</section>

	<div class="text-center">
		<Button onclick={() => goto(localizeHref('/'))}>{m.hero_cta()}</Button>
	</div>
</main>

<Footer />
