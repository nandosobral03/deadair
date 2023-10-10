<script lang="ts">
	import { loadingStore } from '$lib/stores/loading.store';
	import { modalStore } from '$lib/stores/modal.store';
	import { toastStore } from '$lib/stores/toast.store';
	import { parseHTTPError } from '$lib/utils/error';
	import { addPlaylistToChannelAPI } from '$lib/utils/video';

	export let channelId: string;
	export let token: string;
	export let type: 'public' | 'user';
	let playlist = '';

	const massAdd = async () => {
		loadingStore.setLoading(true);
		try {
			const playlistId = playlist.split('list=')[1].split('&')[0];

			await addPlaylistToChannelAPI(channelId, playlistId, token, type);
			toastStore.addToast({
				title: 'Success',
				text: 'Playlist added to channel',
				type: 'success'
			});
		} catch (e) {
			toastStore.addToast({
				title: 'Error',
				text: parseHTTPError(e, 'Error adding playlist to channel'),
				type: 'error'
			});
		} finally {
			loadingStore.setLoading(false);
			modalStore.clear();
		}
	};
</script>

<div class="flex flex-col gap-8 w-full h-full">
	<input
		class="w-full flex-grow border-2 border-gray-100 border-opacity-5
		 rounded-md focus:outline-none focus:ring-2
		 focus:ring-primary focus:border-transparent bg-transparent p-2
		  text-gray-300 resize-none"
		placeholder="Enter playlist URL here (Max 50 videos)"
		bind:value={playlist}
	/>
	<button
		class="w-48 h-12 px-4 bg-primary text-black flex items-center justify-center straight-shadow ml-auto"
		on:click={() => massAdd()}
	>
		Add videos
	</button>
</div>
