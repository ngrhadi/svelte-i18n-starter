<script lang="ts">
	import { useReveal } from './actions.js';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Card from '$lib/components/Card.svelte';

	const testimonials = [
		{ quote: 'The best investment I ever made for my studio setup.', name: 'Alex Johnson', role: 'Music Producer' },
		{ quote: 'Crystal clear sound and incredible comfort for long sessions.', name: 'Maria Chen', role: 'Professional Gamer' },
		{ quote: 'Superior quality that rivals headphones twice the price.', name: 'James Wilson', role: 'Audio Engineer' },
	];
</script>

<section class="py-16 sm:py-24 px-4 bg-gradient-to-br from-[var(--bg-2,var(--bg-1))] to-[var(--bg-1)]">
	<div class="max-w-6xl mx-auto">
		<div use:useReveal class="opacity-0 translate-y-8 transition-all duration-700 mb-12 lg:mb-16">
			<SectionHeader
				title="Loved by Audio Enthusiasts"
				subtitle="Join thousands of satisfied customers worldwide"
				colorClass="text-[var(--fg-2)]"
			/>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
			{#each testimonials as t}
				<div use:useReveal class="opacity-0 translate-y-8 transition-all duration-700">
					<Card class="p-6 lg:p-8 shadow-md hover:shadow-lg hover:-translate-y-2">
						<div class="flex gap-1 mb-4">
							{#each Array(5) as _}
								<span class="text-yellow-400 text-lg">★</span>
							{/each}
						</div>
						<p class="text-[var(--fg-2)] mb-6 leading-relaxed italic">"{t.quote}"</p>
						<div>
							<p class="font-semibold text-[var(--fg-2)]">{t.name}</p>
							<p class="text-sm text-[var(--fg-2)] opacity-60">{t.role}</p>
						</div>
					</Card>
				</div>
			{/each}
		</div>
	</div>
</section>
