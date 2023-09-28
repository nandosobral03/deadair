<script lang="ts">
	import type { PageData, PageServerData } from './$types';
	import ChannelGrid from '$lib/components/ChannelGrid.svelte';
	import { channelStore } from '$lib/utils/channel';
	import Divider from '$lib/components/Divider.svelte';
	export let data: PageData;
	channelStore.set(data.channels);
</script>

<h1 class="text-xl font-medium text-white">Public Channels</h1>
<ChannelGrid type="publicChannels" />
{#if data.token}
	{#if data.channels.userChannels.length > 0}
		<Divider />
		<div class="flex flex-col gap-4 bg-gray-850 rounded-lg p-4">
			<h1 class="text-xl font-medium text-white">Your Channels</h1>
			<ChannelGrid type="userChannels" />
		</div>
	{/if}
	{#if data.channels.sharedChannels.length > 0}
		<Divider />
		<div class="flex flex-col gap-4 bg-gray-850 rounded-lg p-4">
			<h1 class="text-xl font-medium text-white">Shared with you</h1>
			<ChannelGrid type="sharedChannels" />
		</div>
	{/if}
{/if}
