<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Card from '$lib/components/Card.svelte';

	const features = $derived([
		{ title: m.feature_1_title(), desc: m.feature_1_desc() },
		{ title: m.feature_2_title(), desc: m.feature_2_desc() },
		{ title: m.feature_3_title(), desc: m.feature_3_desc() },
	]);
</script>

<section class="py-20 sm:py-24 px-4 bg-[var(--bg-1)] text-center">
	<SectionHeader title={m.why_product()} class="mb-12" />
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
		{#each features as feature}
			<Card interactive class="p-6">
				<div class="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce">
					📱
				</div>
				<h3 class="text-xl font-semibold text-[var(--fg-1)] mb-2 transition-colors duration-300 group-hover:text-[var(--link)]">
					{feature.title}
				</h3>
				<p class="text-[var(--fg-1)] opacity-70">{feature.desc}</p>
			</Card>
		{/each}
	</div>
</section>
