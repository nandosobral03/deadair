<script lang="ts">
	import { browser } from '$app/environment';
	import { removeVideoFromChannel, videoStore } from '$lib/utils/video';
	import Divider from './Divider.svelte';
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	import Icon from './Icon.svelte';
	import { tokenStore } from '$lib/stores/token.store';
	import type { Channel } from '$lib/model/channel.model';
	import { toastStore } from '$lib/stores/toast.store';
	import { parseHTTPError } from '$lib/utils/error';
	dayjs.extend(duration);
	export let channel: Channel;

	$: videos = $videoStore.get(channel.id) || [];
	const handleError = (ev: any) => (ev.target.src = '/placeholder.svg');

	const handleRemoveVideo = async (id: string) => {
		try {
			await removeVideoFromChannel(
				channel.id,
				id,
				$tokenStore!,
				channel.userId ? 'user' : 'public'
			);
		} catch (e) {
			toastStore.addToast({
				text: parseHTTPError(e, "Couldn't remove video from channel"),
				title: 'Error',
				type: 'error'
			});
		}
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
			<button
				class="absolute p-px rounded-md flex items-center content-center top-0 right-0 bg-primary scale-50 invisible"
				on:click={() => handleRemoveVideo(video.id)}
			>
				<Icon icon="close" />
			</button>
			<span
				class="text-gray-100 z-10 h-8 text-xs md:text-md overflow-hidden w-full text-left px-4 whitespace-nowrap overflow-ellipsis"
			>
				{video.title}
				<Divider color="gray-800" class="my-1" />
				<div class="flex flex-col gap-px justify-around flex-grow relative">
					<span class="text-gray-100 text-xs">By: {video.youtubeChannel} </span>
					<span class="text-gray-100 text-xs">
						Duration: {dayjs.duration(video.duration, 'seconds').format('HH:mm:ss')}
					</span>
					<span class="text-gray-100 text-xs mt-2">
						{video.category}
					</span>
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

	@media (max-width: 768px) {
		.channel-grid {
			grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
			grid-template-rows: repeat(auto-fill, 16rem);
		}
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

		> button {
			visibility: visible !important;
		}
	}
</style>
