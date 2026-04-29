<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import FormField from '../FormField.svelte';

	interface Props {
		errorCode?: string | null;
		defaultUsername?: string;
	}

	let { errorCode = null, defaultUsername = '' }: Props = $props();

	const ERROR_MESSAGES: Record<string, () => string> = {
		fields_required: m.login_error_required,
		invalid_credentials: m.login_error_invalid
	};

	const errorMessage = $derived(errorCode ? (ERROR_MESSAGES[errorCode]?.() ?? errorCode) : null);
	let loading = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	}}
	class="flex flex-col gap-4"
>
	{#if errorMessage}
		<div class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
			{errorMessage}
		</div>
	{/if}

	<FormField
		id="username"
		name="username"
		label={m.login_username()}
		value={defaultUsername}
		autocomplete="username"
		placeholder="admin"
		required
	/>

	<FormField
		id="password"
		name="password"
		type="password"
		label={m.login_password()}
		autocomplete="current-password"
		placeholder="••••••••"
		required
	/>

	<button
		type="submit"
		disabled={loading}
		class="mt-2 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
	>
		{loading ? m.login_submitting() : m.login_submit()}
	</button>
</form>
