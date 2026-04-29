<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import LoginForm from '$lib/ui/Form/LoginForm.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>{m.login_title()} — {m.seo_site_name()}</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
		<h1 class="mb-6 text-center text-2xl font-bold text-gray-800">{m.login_title()}</h1>
		<LoginForm errorCode={form?.error} defaultUsername={form?.username} />
		<p class="mt-6 text-center text-xs text-gray-400">{m.login_demo_hint()}</p>
	</div>
</div>
