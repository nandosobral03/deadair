<script lang="ts">
	import ChannelHeader from '$lib/components/ChannelHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import VideoGrid from '$lib/components/VideoGrid.svelte';
	import { toastStore } from '$lib/stores/toast.store';
	import { addVideoToChannel, videoStore } from '$lib/utils/video';
	import type { PageServerData } from './$types';
	import { parseHTTPError } from '$lib/utils/error';
	import { loadingStore } from '$lib/stores/loading.store';
	import type { LayoutServerData } from '../../../$types';
	import { modalStore } from '$lib/stores/modal.store';
	import MassAddModal from '$lib/modals/MassAddModal.svelte';
	import AddPlaylist from '$lib/modals/AddPlaylist.model.svelte';
	export let data: PageServerData & LayoutServerData;
	let videoUrl: string = '';
	videoStore.update((store) => {
		return store.set(data.channel.id, data.videos);
	});

	const payload = data.payload!;
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
			return;
		}
		try {
			loadingStore.setLoading(true);
			loadingStore.setMessage('Adding video to channel');
			await addVideoToChannel(
				data.channel.id,
				id,
				data.token!,
				data.channel.userId ? 'user' : 'public'
			);
			videoUrl = '';
			toastStore.addToast({
				title: 'Success',
				text: 'Video added to channel',
				type: 'success'
			});
		} catch (e) {
			toastStore.addToast({
				title: 'Error',
				text: parseHTTPError(e, 'Error adding video to channel'),
				type: 'error'
			});
		} finally {
			loadingStore.setLoading(false);
		}
	};

	const massAdd = async () => {
		modalStore.set({
			title: 'Mass Add Videos',
			component: MassAddModal,
			props: {
				channelId: data.channel.id,
				token: data.token,
				type: data.channel.userId ? 'user' : 'public'
			},
			size: 'lg'
		});
	};

	const addPlaylist = async () => {
		modalStore.set({
			title: 'Add Playlist',
			component: AddPlaylist,
			props: {
				channelId: data.channel.id,
				token: data.token,
				type: data.channel.userId ? 'user' : 'public',
				isPlaylist: true
			},
			size: 'xs'
		});
	};
</script>

<ChannelHeader channel={data.channel} allowEdit={true} userId={payload.sub} allowWatch={false} />
<div class="flex gap-4 w-full flex-col md:flex-row">
	<div class="flex-grow flex gap-2">
		<input
			bind:value={videoUrl}
			type="text"
			placeholder="https://www.youtube.com/watch?v=..."
			class="w-full h-12 px-4 bg-gray-950 text-gray-200
		straight-shadow max-w-4xl
        "
		/>
		<button
			on:click={() => addVideo()}
			class="w-12 h-12 px-4 bg-primary text-gray-200 flex items-center justify-center straight-shadow"
		>
			<Icon icon="add" className="text-white text-2xl" />
		</button>
	</div>

	<div class="ml-auto flex gap-2">
		<button
			on:click={() => addPlaylist()}
			class="w-12 h-12 px-4 bg-primary text-gray-200 flex items-center justify-center straight-shadow ml-auto"
		>
			<Icon icon="playlist_add" className="text-white text-2xl" />
		</button>

		<button
			on:click={() => massAdd()}
			class="w-12 h-12 px-4 bg-primary text-gray-200 flex items-center justify-center straight-shadow ml-auto"
		>
			<Icon icon="shadow_add" className="text-white text-2xl" />
		</button>
	</div>
</div>
<VideoGrid channel={data.channel} />
