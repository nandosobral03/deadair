<script lang="ts">
	import { loadingStore } from '$lib/stores/loading.store';
	import { modalStore } from '$lib/stores/modal.store';
	import { toastStore } from '$lib/stores/toast.store';
	import { parseHTTPError } from '$lib/utils/error';
	import { addVideoToChannel } from '$lib/utils/video';

	export let channelId: string;
	export let token: string;
	export let type: 'public' | 'user';
	let videos = '';
	const addVideo = async (videoUrl: string) => {
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
		await addVideoToChannel(channelId, id, token!, type);
	};

	const massAdd = async () => {
		let failed = 0;
		loadingStore.setLoading(true);
		const videosInTens = videos
			.split('\n')
			.filter((v) => v !== '')
			.reduce((acc, cur, i) => {
				const index = Math.floor(i / 10);
				if (!acc[index]) {
					acc[index] = [];
				}
				acc[index].push(cur);
				return acc;
			}, [] as string[][]);

		for (const ten of videosInTens) {
			const results = await Promise.allSettled(ten.map((v) => addVideo(v)));
			failed += results.filter((r) => r.status === 'rejected').length;
		}

		toastStore.addToast({
			title: 'Success',
			text: `Added ${videos.split('\n').filter((v) => v !== '').length - failed} videos`,
			type: 'success'
		});

		loadingStore.setLoading(false);
		modalStore.clear();
	};
</script>

<div class="flex flex-col gap-8 w-full h-full">
	<textarea
		class="w-full flex-grow border-2 border-gray-100 border-opacity-5
		w-full
		 rounded-md focus:outline-none focus:ring-2
		 focus:ring-primary focus:border-transparent bg-transparent p-2
		  text-gray-300
				h-32 resize-none"
		placeholder="Enter video IDs seperated by a new line"
		bind:value={videos}
	/>
	<button
		class="w-48 h-12 px-4 bg-primary text-black flex items-center justify-center straight-shadow ml-auto"
		on:click={() => massAdd()}
	>
		Add videos
	</button>
</div>
