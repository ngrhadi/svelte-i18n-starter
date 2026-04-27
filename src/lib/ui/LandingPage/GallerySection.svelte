<script lang="ts">
	import heroImage from '$lib/assets/images/image.png';
	import { useScrollReveal, useParallax } from './actions.js';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	const galleryItems: { title: string; desc: string; from: 'left' | 'right' }[] = [
		{
			title: 'Premium Quality',
			desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque blanditiis rerum dignissimos quibusdam esse commodi earum eos, non dolores culpa voluptatum similique consequatur quaerat corporis officia eligendi quae neque itaque quisquam tenetur minus qui dolor fugiat expedita. Voluptate at tempore, maiores, voluptatem officia id dicta corrupti excepturi esse consequatur eveniet!',
			from: 'left',
		},
		{
			title: 'Professional Grade',
			desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque blanditiis rerum dignissimos quibusdam esse commodi earum eos, non dolores culpa voluptatum similique consequatur quaerat corporis officia eligendi quae neque itaque quisquam tenetur minus qui dolor fugiat expedita. Voluptate at tempore, maiores, voluptatem officia id dicta corrupti excepturi esse consequatur eveniet!',
			from: 'right',
		},
		{
			title: 'Innovation Meets Design',
			desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque blanditiis rerum dignissimos quibusdam esse commodi earum eos, non dolores culpa voluptatum similique consequatur quaerat corporis officia eligendi quae neque itaque quisquam tenetur minus qui dolor fugiat expedita. Voluptate at tempore, maiores, voluptatem officia id dicta corrupti excepturi esse consequatur eveniet!',
			from: 'left',
		},
	];
</script>

<section class="py-20 sm:py-32 px-4 bg-[var(--bg-1)]">
	<div class="max-w-5xl mx-auto">
		<SectionHeader title="Featured Showcase" class="mb-20" />

		<div class="flex flex-col gap-24">
			{#each galleryItems as item}
				<div
					class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
					use:useScrollReveal={{ from: item.from }}
				>
					<div class="overflow-hidden rounded-2xl shadow-lg aspect-video md:aspect-[4/3] bg-[var(--bg-2)]">
						<img
							src={heroImage}
							alt={item.title}
							class="w-full h-full object-cover will-change-transform transition-transform duration-500 hover:scale-110"
							use:useParallax
						/>
					</div>
					<div class="flex flex-col gap-4">
						<h3 class="text-2xl lg:text-3xl font-bold text-[var(--fg-1)]">{item.title}</h3>
						<p class="text-[var(--fg-1)] opacity-70 text-base lg:text-lg leading-relaxed">{item.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
