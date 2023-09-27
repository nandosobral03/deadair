<script lang="ts">
	import { browser } from '$app/environment';
	import { removeVideoFromChannel, videoStore } from '$lib/utils/video';
	import Divider from './Divider.svelte';
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	import Icon from './Icon.svelte';
	import { tokenStore } from '$lib/stores/token.store';
	import type { Channel } from '$lib/model/channel.model';
	dayjs.extend(duration);
	export let channel: Channel;

	$: videos = $videoStore.get(channel.id) || [];
	const handleError = (ev: any) => (ev.target.src = '/placeholder.svg');

	const handleRemoveVideo = (id: string) => {
		removeVideoFromChannel(channel.id, id, $tokenStore!, channel.userId ? 'user' : 'public');
	};
</script>

<div class="channel-grid w-full h-full">
	{#each videos as video}
		<div
			class="bg-primary w-full h-48 relative flex flex-col items-start justify-end gap-2 straight-shadow
            hoverable"
		>
			<div class="grow items-center justify-center w-full relative">
				{#if browser}
					<img
						class="object-cover h-full w-full place-content-center absolute"
						src={video.thumbnail || '/placeholder.svg'}
						alt={video.title}
						on:error={handleError}
					/>
				{/if}
			</div>
			<span class="text-gray-900 z-10 h-8 text-md overflow-hidden w-full text-left px-4">
				{video.title}
				<Divider color="gray-800" class="my-1" />
				<div class="flex flex-col gap-px justify-around flex-grow relative">
					<span class="text-gray-800 text-xs">By: {video.youtubeChannel} </span>
					<span class="text-gray-800 text-xs">
						Duration: {dayjs.duration(video.duration, 'seconds').format('HH:mm:ss')}
					</span>
					<span class="text-gray-800 text-xs mt-2">
						{video.category}
					</span>
					<button class="absolute -bottom-8 right-0" on:click={() => handleRemoveVideo(video.id)}>
						<Icon icon="close" />
					</button>
				</div>
			</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.channel-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		grid-template-rows: repeat(auto-fill, 12rem);
		grid-gap: 1rem;
	}

	.hoverable {
		cursor: default !important;
		> span {
			transition: height 0.2s ease-in-out;
		}
	}
	.hoverable:hover {
		> span {
			height: 10rem !important;
		}
	}
</style>
