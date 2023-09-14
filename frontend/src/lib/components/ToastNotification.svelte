<script lang="ts">
	import { fly } from 'svelte/transition';

	export let type: 'success' | 'error' | 'warning' | 'info' = 'info';
	export let title: string = 'Title';
	export let text: string = 'Text';
	export let timestamp: number = Date.now();

	let colors = {
		success: '#4caf50',
		error: '#f44336',
		warning: '#ff9800',
		info: '#2196f3'
	};
</script>

<div
	style={`border-left: 0.5rem solid ${colors[type]}`}
	transition:fly={{ x: 200, duration: 300 }}
	class="bg-gray-800 rounded-md flex flex-col gap-2 p-4 w-96 mr-4 shadow-md text-gray-100"
>
	<span class="text-md font-semibold uppercase underline">{title}</span>
	<span class="text-sm font-normal break-words">{text}</span>
	<span class="flex w-full justify-end text-xs font-light mt-2"
		>{new Date(timestamp).toLocaleTimeString()}</span
	>
</div>
