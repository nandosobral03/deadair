<script lang="ts">
	import type { PageData, PageServerData } from './$types';
	import ChannelGrid from '$lib/components/ChannelGrid.svelte';
	import { channelStore } from '$lib/utils/channel';

	export let data: PageData;
	channelStore.set(data.channels);
</script>

<div class="w-full h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
	<h1 class="text-3xl text-primary">Public Channels</h1>
	<ChannelGrid type="publicChannels" />
	<!-- <ChannelGrid type="privateChannels" /> -->
</div>
