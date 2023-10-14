<script lang="ts">
	import type { PageData, PageServerData } from './$types';
	import ChannelGrid from '$lib/components/ChannelGrid.svelte';
	import { channelStore } from '$lib/utils/channel';
	export let data: PageData;
	channelStore.set(data.channels);
</script>

<div class="flex flex-col gap-4 bg-gray-850 rounded-md md:p-4">
	<h1 class="text-xl text-gray-100">Public Channels</h1>
	<ChannelGrid type="publicChannels" allowCreate />
</div>
