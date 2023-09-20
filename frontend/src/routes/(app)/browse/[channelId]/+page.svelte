<script lang="ts">
	import ChannelHeader from '$lib/components/ChannelHeader.svelte';
	import ChannelSchedule from '$lib/components/ChannelSchedule.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	console.log(data);
</script>

<ChannelHeader channel={data.channel} allowWatch />
<ChannelSchedule originalSchedule={data.schedule} />
