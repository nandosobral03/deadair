<script lang="ts">
	import TooltippedInput from '$lib/components/TooltippedInput.svelte';
	import { modalStore } from '$lib/stores/modal.store';
	import { sleepingStore, sleepingTimerStore } from '$lib/stores/sleeping.store';
	let item = {
		value: 1,
		error: '',
		validator: (value: any) => {
			if (value < 1) return 'Time till sleep must be over 1 minute';
			return '';
		}
	};

	const sleep = (minutes: number) => {
		if ($sleepingTimerStore) {
			clearTimeout($sleepingTimerStore);
			$sleepingTimerStore = null;
		}
		let timeout = setTimeout(() => {
			sleepingStore.set(true);
		}, minutes * 60 * 1000);
		sleepingTimerStore.set(timeout);
		modalStore.clear();
	};

	const clear = () => {
		if ($sleepingTimerStore) {
			clearTimeout($sleepingTimerStore);
			$sleepingTimerStore = null;
		}
		sleepingStore.set(false);
		modalStore.clear();
	};
</script>

<div class="flex flex-col gap-4 justify-center items-center h-full">
	{#if !$sleepingTimerStore}
		<button
			class="bg-primary text-gray-900 py-2 rounded-md hoverable w-full"
			on:click={() => sleep(30)}
		>
			Sleep in 30 minutes
		</button>
		<button
			class="bg-primary text-gray-900 py-2 rounded-md hoverable w-full"
			on:click={() => sleep(60)}
		>
			Sleep in 60 minutes
		</button>
		<button
			class="bg-primary text-gray-900 py-2 rounded-md hoverable w-full"
			on:click={() => sleep(90)}
		>
			Sleep in 90 minutes
		</button>
		<button
			class="bg-primary text-gray-900 py-2 rounded-md hoverable w-full"
			on:click={() => sleep(120)}
		>
			Sleep in 120 minutes
		</button>
		<div class="flex w-full gap-4">
			<TooltippedInput type="number" placeholder="Custom" bind:item />
			<button
				class="bg-primary text-gray-900 py-2 rounded-md hoverable flex-grow"
				on:click={() => sleep(item.value)}
			>
				Sleep in {item.value ? item.value : 0}
				{item.value == 1 ? 'minute' : 'minutes'}
			</button>
		</div>
	{:else}
		<button
			class="bg-primary text-gray-900 py-4 px-8 rounded-md hoverable"
			on:click={() => clear()}
		>
			Clear sleep timer
		</button>
	{/if}
</div>
