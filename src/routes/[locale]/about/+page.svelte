<script>
	import Header from '$lib/ui/Header.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<Header />

<main class="container">
	<h1>{m.about_title()}</h1>
	<p>{m.about_desc()}</p>

	<section>
		<h2>{m.about_features()}</h2>
		<ul>
			<li>{m.feature_easing()}</li>
			<li>{m.feature_i18n()}</li>
			<li>{m.feature_responsive()}</li>
		</ul>
	</section>

	<section>
		<h2>{m.about_tech()}</h2>
		<ul>
			<li>{m.tech_svelte()}</li>
			<li>{m.tech_tailwind()}</li>
			<li>{m.tech_paraglide()}</li>
			<li>{m.tech_vite()}</li>
		</ul>
	</section>
</main>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		color: var(--fg-1);
	}

	h2 {
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: var(--fg-1);
	}

	p {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--fg-2);
		margin-bottom: 1rem;
	}

	ul {
		list-style: disc;
		padding-left: 2rem;
		color: var(--fg-2);
	}

	li {
		margin-bottom: 0.5rem;
	}

	section {
		margin-bottom: 2rem;
	}
</style>
