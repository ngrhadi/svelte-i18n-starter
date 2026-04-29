<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{m.dashboard_title()} — {m.seo_site_name()}</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<header class="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
		<h1 class="text-lg font-semibold text-gray-800">{m.dashboard_title()}</h1>
		<div class="flex items-center gap-4">
			<span class="text-sm text-gray-600">
				{data.user?.name}
				<span
					class="ml-1 rounded-full px-2 py-0.5 text-xs font-medium
					{data.user?.role === 'admin'
						? 'bg-purple-100 text-purple-700'
						: 'bg-blue-100 text-blue-700'}"
				>
					{data.user?.role}
				</span>
			</span>
			<form method="POST" action="?/logout" use:enhance>
				<button
					type="submit"
					class="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
				>
					{m.dashboard_logout()}
				</button>
			</form>
		</div>
	</header>

	<main class="mx-auto max-w-4xl p-8">
		<div class="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-6">
			<p class="text-sm text-blue-600">{m.dashboard_welcome()}</p>
			<p class="mt-1 text-2xl font-bold text-blue-800">{data.user?.name}</p>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<div class="rounded-xl border bg-white p-6 shadow-sm">
				<p class="text-xs font-medium uppercase tracking-wide text-gray-500">
					{m.dashboard_field_username()}
				</p>
				<p class="mt-1 text-lg font-semibold text-gray-800">{data.user?.username}</p>
			</div>
			<div class="rounded-xl border bg-white p-6 shadow-sm">
				<p class="text-xs font-medium uppercase tracking-wide text-gray-500">
					{m.dashboard_field_role()}
				</p>
				<p class="mt-1 text-lg font-semibold text-gray-800 capitalize">{data.user?.role}</p>
			</div>
			<div class="rounded-xl border bg-white p-6 shadow-sm">
				<p class="text-xs font-medium uppercase tracking-wide text-gray-500">
					{m.dashboard_field_status()}
				</p>
				<p class="mt-1 text-lg font-semibold text-green-600">{m.dashboard_status_active()}</p>
			</div>
		</div>
	</main>
</div>
