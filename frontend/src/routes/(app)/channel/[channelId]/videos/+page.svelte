<script lang="ts">
	import ChannelHeader from '$lib/components/ChannelHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import VideoGrid from '$lib/components/VideoGrid.svelte';
	import { toastStore } from '$lib/stores/toast.store';
	import { addVideoToChannel, videoStore } from '$lib/utils/video';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	export let data: PageServerData;
	let videoUrl: string = '';
	videoStore.update((store) => {
		return store.set($page.params.channelId, data.videos);
	});
	const addVideo = async () => {
		let id = '';
		try {
			id = videoUrl.split('v=')[1].split('&')[0];
		} catch {
			toastStore.addToast({
				title: 'Error',
				text: 'Please enter a valid YouTube URL',
				type: 'error'
			});
		}
		try {
			await addVideoToChannel($page.params.channelId, id);
		} catch {
			toastStore.addToast({
				title: 'Error',
				text: 'Error adding video to channel',
				type: 'error'
			});
		}
	};
</script>

<ChannelHeader channel={data.channel} />
<div class="flex gap-2 p-4 bg-gray-900 w-full">
	<input
		bind:value={videoUrl}
		type="text"
		placeholder="https://www.youtube.com/watch?v=..."
		class="w-full h-12 px-4 bg-gray-800 text-gray-200
            straight-shadow
        "
	/>
	<button
		on:click={() => addVideo()}
		class="w-12 h-12 px-4 bg-primary text-gray-200 flex items-center justify-center straight-shadow"
	>
		<Icon icon="add" className="text-white text-2xl" />
	</button>
</div>
<VideoGrid channel={data.channel.id} />
