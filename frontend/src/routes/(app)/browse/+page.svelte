<script lang="ts">
	import type { PageData, PageServerData } from './$types';
	import ChannelGrid from '$lib/components/ChannelGrid.svelte';
	import ChannelGridParam from '$lib/components/ChannelGridParam.svelte';
	import { channelStore } from '$lib/utils/channel';
	import Divider from '$lib/components/Divider.svelte';
	import fuzzysearch from 'fuzzysearch';
	export let data: PageData;

	channelStore.set(data.channels);
	let channelQuery = '';

	let shownChannels = [
		...data.channels.publicChannels,
		...data.channels.userChannels,
		...data.channels.sharedChannels
	];

	$: {
		if (channelQuery) {
			shownChannels = [
				...data.channels.publicChannels,
				...data.channels.userChannels,
				...data.channels.sharedChannels
			].filter((channel) =>
				fuzzysearch(channelQuery.toLowerCase(), channel.name.toLocaleLowerCase())
			);
		}
	}
</script>

<input
	bind:value={channelQuery}
	type="text"
	placeholder="Search "
	class="border-2 w-full
border-gray-100 border-opacity-5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent p-2 text-gray-300"
/>

{#if !channelQuery}
	<div class="flex flex-col gap-4 bg-gray-850 rounded-md md:p-4">
		<h1 class="text-xl text-gray-100">Public Channels</h1>
		<ChannelGrid type="publicChannels" />
	</div>
	{#if data.token}
		{#if data.channels.userChannels.length > 0}
			<Divider />
			<div class="flex flex-col gap-4 bg-gray-850 rounded-md md:p-4">
				<h1 class="text-xl text-gray-100">Your Channels</h1>
				<ChannelGrid type="userChannels" />
			</div>
		{/if}
		{#if data.channels.sharedChannels.length > 0}
			<Divider />
			<div class="flex flex-col gap-4 bg-gray-850 rounded-md md:p-4">
				<h1 class="text-xl text-gray-100">Shared with you</h1>
				<ChannelGrid type="sharedChannels" />
			</div>
		{/if}
	{/if}
{:else}
	<ChannelGridParam userId={data.payload?.sub} channels={shownChannels} />
{/if}
