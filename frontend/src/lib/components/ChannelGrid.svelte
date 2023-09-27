<script lang="ts">
	import { browser } from '$app/environment';
	import CreateChannel from '$lib/modals/CreateChannel.modal.svelte';
	import { modalStore } from '$lib/stores/modal.store';
	import { channelStore } from '$lib/utils/channel';
	import Divider from './Divider.svelte';
	import Icon from './Icon.svelte';
	export let allowCreate: boolean = false;
	export let type: keyof typeof $channelStore = 'publicChannels';
	const handleError = (ev: any) => (ev.target.src = '/placeholder.svg');

	const createChannel = () => {
		modalStore.set({
			title: 'Create Channel',
			component: CreateChannel,
			props: {
				type: type == 'userChannels' ? 'user' : 'public'
			},
			size: 'md'
		});
	};

	const handleSelect = (channel: any) => {
		if (allowCreate) {
			window.location.href = `/channel/${channel.channelNumber}`;
		} else {
			window.location.href = `/browse/${channel.channelNumber}`;
		}
	};
</script>

<div class="channel-grid w-full h-full">
	{#each $channelStore[type] as channel}
		<button
			on:click={() => handleSelect(channel)}
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
			<span class="text-gray-800 z-10 h-8 text-sm overflow-hidden w-full text-left px-4">
				{channel.name}
				<Divider />
				<span class="text-gray-800 text-xs">{channel.description} </span>
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
				<Icon icon="add" className="text-gray-800 text-8xl" />
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

	button {
		> span {
			transition: height 0.2s ease-in-out;
		}
	}
	button:hover {
		> span {
			height: 200px !important;
		}
	}
</style>
