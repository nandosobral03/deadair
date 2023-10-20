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
			// toastStore.addToast({
			// 	title: 'Error',
			// 	text: 'Please enter a valid YouTube URL',
			// 	type: 'error'
			// });
			throw { url: videoUrl };
		}
		await addVideoToChannel(channelId, id, token!, type);
	};

	const massAdd = async () => {
		let failed = 0;
		let failedUrls = [];
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
			console.log(
				failed,
				results.filter((r) => r.status === 'rejected')
			);
			failedUrls.push(
				...results
					.filter((r) => r.status === 'rejected')
					.filter((r) => (r as any).reason.url)
					.map((r) => (r as any).reason.url)
			);
		}

		loadingStore.setLoading(false);
		if (failedUrls.length > 0) {
			toastStore.addToast({
				title: 'Error',
				text: `Failed to add ${failed} videos, incorrectly parsed URLs are left on the text area`,
				type: 'error'
			});
			videos = failedUrls.join('\n');
		} else {
			toastStore.addToast({
				title: 'Success',
				text: `Added ${videos.split('\n').filter((v) => v !== '').length - failed} videos`,
				type: 'success'
			});

			modalStore.clear();
		}
	};
</script>

<div class="flex flex-col gap-8 w-full h-full">
	<textarea
		class="w-full flex-grow border-2 border-gray-100 border-opacity-5
		 rounded-md focus:outline-none focus:ring-2
		 focus:ring-primary focus:border-transparent bg-transparent p-2
		  text-gray-300
				h-32 resize-none"
		placeholder="Enter video IDs seperated by a new line"
		bind:value={videos}
	/>
	<button
		class="w-48 h-12 px-4 bg-primary text-gray-100 flex items-center justify-center straight-shadow ml-auto"
		on:click={() => massAdd()}
	>
		Add videos
	</button>
</div>
