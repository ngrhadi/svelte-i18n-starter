<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import heroImage from '$lib/assets/images/image.png';
	import Button from '$lib/components/Button.svelte';
</script>

<section class="min-h-[90vh] flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-[var(--bg-1)] to-[var(--bg-2,var(--bg-1))]">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl w-full items-center">
		<div class="space-y-6 text-center lg:text-left">
			<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--fg-1)] leading-tight animate-slide-in-left">
				{m.hero_title()}
			</h1>
			<p class="text-lg sm:text-xl text-[var(--fg-1)] opacity-80 animate-slide-in-up animation-delay-200">
				{m.hero_subtitle()}
			</p>
			<Button class="animate-slide-in-up animation-delay-400">{m.hero_cta()}</Button>
		</div>
		<div class="flex justify-center items-center">
			<img
				src={heroImage}
				alt="Start Audio"
				class="w-full max-w-md h-auto animate-float"
			/>
		</div>
	</div>
</section>

<style>
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-20px); }
	}

	@keyframes slideInLeft {
		from { opacity: 0; transform: translateX(-50px); }
		to { opacity: 1; transform: translateX(0); }
	}

	@keyframes slideInUp {
		from { opacity: 0; transform: translateY(30px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.animate-float { animation: float 3s ease-in-out infinite; }
	.animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
	.animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
	.animation-delay-200 { animation-delay: 200ms; }
	.animation-delay-400 { animation-delay: 400ms; }
</style>
