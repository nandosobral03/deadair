<script lang="ts">
	import type { PageData, PageServerData } from './$types';
	import ChannelGrid from '$lib/components/ChannelGrid.svelte';
	import { channelStore } from '$lib/utils/channel';
	export let data: PageData;
	channelStore.set(data.channels);
</script>

<h1 class="text-xl text-primary">Public Channels</h1>
<ChannelGrid type="publicChannels" allowCreate />
