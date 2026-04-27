<script>
	import Header from '$lib/ui/Header.svelte';
	import Footer from '$lib/ui/Footer.svelte';
	import LandingPage from '$lib/ui/LandingPage/index.svelte';
	import { m } from '$lib/paraglide/messages';
	import { page } from '$app/state';

	const ogLocale = $derived(page.params.locale === 'id' ? 'id_ID' : 'en_US');
</script>

<svelte:head>
	<title>{m.seo_home_title()}</title>
	<meta name="description" content={m.seo_home_desc()} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={m.seo_site_name()} />
	<meta property="og:title" content={m.seo_home_title()} />
	<meta property="og:description" content={m.seo_home_desc()} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:locale" content={ogLocale} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.seo_home_title()} />
	<meta name="twitter:description" content={m.seo_home_desc()} />
	<link rel="canonical" href={page.url.href} />
</svelte:head>

<Header />

<LandingPage />

<Footer />
