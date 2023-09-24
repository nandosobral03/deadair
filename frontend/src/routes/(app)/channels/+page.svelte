<script lang="ts">
	import ChannelGrid from '$lib/components/ChannelGrid.svelte';
	import { channelStore } from '$lib/utils/channel';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	channelStore.set(data.channels);
	console.log(data);
</script>

<ChannelGrid type="userChannels" allowCreate />
