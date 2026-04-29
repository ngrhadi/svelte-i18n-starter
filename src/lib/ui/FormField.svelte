<script lang="ts">
	interface Props {
		id: string;
		name: string;
		label: string;
		type?: string;
		value?: string;
		placeholder?: string;
		required?: boolean;
		autocomplete?: string;
	}

	let {
		id,
		name,
		label,
		type = 'text',
		value = '',
		placeholder = '',
		required = false,
		autocomplete
	}: Props = $props();
</script>

<div class="flex flex-col gap-1">
	<label for={id} class="text-sm font-medium text-gray-700">{label}</label>
	<input
		{id}
		{name}
		{type}
		{value}
		{placeholder}
		{required}
		autocomplete={autocomplete as AutoFill}
		class="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
	/>
</div>
