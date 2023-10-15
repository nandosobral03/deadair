<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { loadingStore } from '$lib/stores/loading.store';
	import { toastStore } from '$lib/stores/toast.store';
	import { tokenStore } from '$lib/stores/token.store';
	import { joinChannelAPI } from '$lib/utils/channel';
	import { parseHTTPError } from '$lib/utils/error';
	import type { LayoutServerData } from '../../../$types';
	import type { PageServerData } from './$types';
	export let data: PageServerData & LayoutServerData;
	console.log(data);
	const handleJoin = async () => {
		try {
			loadingStore.setLoading(true);
			await joinChannelAPI(data.channel.id, $tokenStore!);
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

<div class="h-full w-full flex flex-col items-center justify-center p-4">
	<div
		class="flex flex-col items-center justify-center gap-8 bg-gray-950 p-8 w-full md:w-1/2 rounded-md straight-shadow"
	>
		<h1 class="text-xl md:text-3xl text-primary opacity-100 text-center">Join Channel</h1>
		<div class="flex flex-col md:flex-row gap-4 items-start p-4">
			<div class="flex items-center justify-center w-48 h-full aspect-square">
				<img src={data.channel.thumbnail} alt="Channel logo" class="w-48 h-24 rounded-md" />
			</div>
			<div class="flex flex-col gap-2">
				<span class="text-gray-50">
					You are about to join <span class="text-primary">{data.channel.name}</span>
				</span>

				<span class="text-gray-50 text-sm">
					{data.channel.description}
				</span>
			</div>
		</div>

		<button class="bg-primary text-gray-100 rounded-md p-2 w-full" on:click={handleJoin}>
			Join
		</button>
	</div>
</div>
