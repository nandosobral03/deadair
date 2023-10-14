<script lang="ts">
	import { browser } from '$app/environment';
	import type { Channel } from '$lib/model/channel.model';
	import Divider from './Divider.svelte';
	export let channels: Channel[];
	export let userId: string | undefined;
	const handleError = (ev: any) => (ev.target.src = '/placeholder.svg');

	const getUrl = (channel: Channel) => {
		if (!channel.userId) {
			return `/browse/${channel.channelNumber}`;
		} else if (channel.userId === userId) {
			return `/browse/${channel.channelNumber}`;
		} else {
			return `/browse/shared/${channel.id}`;
		}
	};

	console.log(channels);
</script>

<div class="channel-grid w-full h-full">
	{#each channels as channel}
		<a
			href={getUrl(channel)}
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
				class="text-gray-100 z-10 h-8 text-xs md:text-md overflow-hidden w-full px-4 flex flex-col gap-1"
			>
				<span class="text-left whitespace-nowrap overflow-ellipsis">
					{channel.name}
				</span>
				<Divider />
				<span class="text-gray-100 text-xs invisible md:visible h-full"
					>{channel.description}
				</span>
			</span>
		</a>
	{/each}
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
