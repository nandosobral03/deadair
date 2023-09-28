<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { loadingStore } from '$lib/stores/loading.store';
	import { toastStore } from '$lib/stores/toast.store';
	import { tokenStore } from '$lib/stores/token.store';
	import { joinChannelAPI } from '$lib/utils/channel';
	import { parseHTTPError } from '$lib/utils/error';
	const { channelId } = $page.params;
	const title = $page.url.searchParams.get('title');
	if (browser) {
		if (!channelId || !title) {
			window.location.href = '/channels';
		}
	}

	const handleJoin = async () => {
		try {
			loadingStore.setLoading(true);
			await joinChannelAPI(channelId, $tokenStore!);
			window.location.href = '/browse';
		} catch (e) {
			toastStore.addToast({
				type: 'error',
				text: parseHTTPError(e, 'Error joining channel'),
				title: 'Error'
			});
			console.log(e);
		} finally {
			loadingStore.setLoading(false);
		}
	};
</script>

<div class="h-full w-full flex flex-col items-center justify-center">
	<div
		class="flex flex-col items-center justify-center gap-4 bg-gray-950 p-12 rounded-md straight-shadow"
	>
		<h1 class="text-4xl text-primary opacity-100">Join a channel</h1>
		<span class="text-gray-50">
			You are about to join <span class="text-primary">{title}</span>
		</span>

		<button class="bg-primary text-gray-950 rounded-md p-2 w-full" on:click={handleJoin}>
			Join
		</button>
	</div>
</div>
