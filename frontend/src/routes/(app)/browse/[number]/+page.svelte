<script lang="ts">
	import ChannelHeader from '$lib/components/ChannelHeader.svelte';
	import ChannelSchedule from '$lib/components/ChannelSchedule.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<ChannelHeader channel={data.channel} allowWatch />
{#if data.schedule.length > 0}
	<ChannelSchedule originalSchedule={data.schedule} />
{/if}
