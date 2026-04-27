<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$lib/components/Button.svelte';
</script>

<section class="py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600">
	<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{m.cta_title()}</h2>
	<p class="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{m.cta_desc()}</p>
	<Button variant="white" size="lg">{m.cta_button()}</Button>
</section>
