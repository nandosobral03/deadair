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
			size: 'lg'
		});
	};
</script>

<div class="channel-grid w-full h-full">
	{#each $channelStore[type] as channel}
		<a
			href={allowCreate
				? `/channel/${channel.channelNumber}`
				: type == 'sharedChannels'
				? `/browse/shared/${channel.id}`
				: `/browse/${channel.channelNumber}`}
			class="bg-primary w-full aspect-square max-h-64 relative flex flex-col items-start justify-end gap-2 straight-shadow
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
			<span
				class="text-gray-100 z-10 h-8 text-xs md:text-lg overflow-hidden w-full px-4 flex flex-col gap-1"
			>
				<span class="text-left whitespace-nowrap overflow-ellipsis">
					{channel.name}
				</span>
				<Divider />
				<span class="text-gray-100 text-xs invisible md:visible h-full md:text-base">
					{channel.description}
				</span>
			</span>
		</a>
	{/each}
	{#if allowCreate}
		<button
			on:click={() => createChannel()}
			class="bg-primary w-full max-h-64 aspect-square relative flex flex-col items-center justify-center straight-shadow
	hoverable"
		>
			<div>
				<Icon icon="add" className="text-gray-100 lg:text-8xl text-6xl" />
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

	@media (max-width: 768px) {
		.channel-grid {
			grid-template-columns: repeat(auto-fill, minmax(6rem, 2fr));
			grid-template-rows: repeat(auto-fill, 8rem);
			grid-gap: 0.5rem;
		}
	}

	a {
		> span {
			transition: height 0.2s ease-in-out;
		}
	}
	a:hover {
		> span {
			height: 50px !important;
		}
		@media (min-width: 768px) {
			> span {
				height: 200px !important;
			}
		}
	}
</style>
