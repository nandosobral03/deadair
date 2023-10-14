<script lang="ts">
	import ChannelGrid from '$lib/components/ChannelGrid.svelte';
	import { channelStore } from '$lib/utils/channel';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	channelStore.set(data.channels);
	console.log(data);
</script>

<div class="flex flex-col gap-4 bg-gray-850 rounded-md md:p-4">
	<h1 class="text-xl text-gray-100">Your Channels</h1>
	<ChannelGrid type="userChannels" allowCreate />
</div>
