<script lang="ts">
	import type { PageData } from './$types';
	import WatchChannel from '$lib/components/WatchChannel.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import type { LayoutServerData } from '../../$types';
	import Icon from '$lib/components/Icon.svelte';
	export let data: PageData & LayoutServerData;

	let showChat = false;
</script>

<div class="flex flex-col lg:flex-row gap-4 bg-gray-850 rounded-md p-4 w-full h-full relative">
	<button
		class="absolute top-2 right-2 text-gray-200 hoverable z-20 bg-primary p-2 rounded-md flex items-center justify-center"
		on:click={() => (showChat = !showChat)}
	>
		<Icon icon={showChat ? 'comments_disabled' : 'chat'} />
	</button>
	<WatchChannel originalSchedule={data.schedule} channelName={data.channel.name} />
	{#if showChat}
		<Chat channel={data.channel.id} token={data.token} />
	{/if}
</div>
