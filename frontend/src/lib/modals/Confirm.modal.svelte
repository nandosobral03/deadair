<script lang="ts">
	import { modalStore } from '$lib/stores/modal.store';

	export let message: string;
	export let action: () => void;
	export let isDestructive: boolean = false;
</script>

<div class="flex flex-col items-center justify-center h-full gap-4 mt-6">
	<div class="text-center">
		<p class="text-gray-50">{message}</p>
	</div>
	<div class="flex gap-4 self-end mt-auto">
		<button class=" hoverable px-4 py-2 rounded-md text-primary" on:click={() => modalStore.clear()}
			>No</button
		>
		<button
			class=" hoverable px-4 py-2 rounded-md"
			class:bg-red-700={isDestructive}
			class:text-white={isDestructive}
			class:bg-primary={!isDestructive}
			on:click={action}>Yes</button
		>
	</div>
</div>
