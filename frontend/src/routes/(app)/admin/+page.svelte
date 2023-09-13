<script lang="ts">
	import type { PageServerData } from './$types';
	import ChannelGrid from '$lib/components/ChannelGrid.svelte';
	export let data: PageServerData;
</script>

<div class="w-full h-full flex flex-col gap-4">
	<h1 class="text-3xl text-primary">Public Channels</h1>
	<ChannelGrid channels={data.channels.publicChannels} allowCreate />
</div>
