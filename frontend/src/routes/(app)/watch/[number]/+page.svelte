<script lang="ts">
	import type { PageData } from './$types';
	import WatchChannel from '$lib/components/WatchChannel.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import type { LayoutServerData } from '../../$types';
	export let data: PageData & LayoutServerData;
</script>

<div class="flex flex-col lg:flex-row gap-4 bg-gray-850 rounded-lg p-4 w-full h-full">
	<WatchChannel originalSchedule={data.schedule} channelName={data.channel.name} />
	<Chat channel={data.channel.id} token={data.token} />
</div>
