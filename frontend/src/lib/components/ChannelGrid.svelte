<script lang="ts">
	import { browser } from '$app/environment';
	import CreateChannel from '$lib/modals/CreateChannel.modal.svelte';
	import type { Channel } from '$lib/model/channel.model';
	import { modalStore } from '$lib/stores/modal.store';
	import Divider from './Divider.svelte';
	import Icon from './Icon.svelte';
	export let channels: Channel[] = [];
	export let allowCreate: boolean = false;

	const handleError = (ev: any) => (ev.target.src = '/placeholder.svg');
	const createChannel = () => {
		modalStore.set({
			title: 'Create Channel',
			component: CreateChannel,
			props: {
				type: 'public'
			},
			size: 'md'
		});
	};
</script>

<div class="channel-grid w-full h-full">
	{#each channels as channel}
		<button
			on:click={() => (window.location.href = `/channel/${channel.id}`)}
			class="bg-primary w-full h-64 relative flex flex-col items-start justify-end gap-2 straight-shadow
            hoverable"
		>
			<div class="grow items-center justify-center w-full relative">
				{#if browser}
					<img
						class="object-cover h-full w-full place-content-center absolute"
						src={channel.thumbnail || '/placeholder.svg'}
						alt={channel.name}
						on:error={handleError}
					/>
				{/if}
			</div>
			<span class="text-gray-200 z-10 max-h-8 h-8 text-sm overflow-hidden w-full text-left px-4">
				{channel.name}
				<Divider />
				<span class="text-gray-200 text-xs">{channel.description} </span>
			</span>
		</button>
	{/each}
	{#if allowCreate}
		<button
			on:click={() => createChannel()}
			class="bg-primary w-full h-64 relative flex flex-col items-center justify-center straight-shadow
	hoverable"
		>
			<div>
				<Icon icon="add" className="text-white text-8xl" />
			</div>
		</button>
	{/if}
</div>

<style lang="scss">
	.channel-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		grid-template-rows: repeat(auto-fill, 16rem);
		grid-gap: 1rem;
	}
</style>
