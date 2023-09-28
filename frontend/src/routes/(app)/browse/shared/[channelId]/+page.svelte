<script lang="ts">
	import ChannelHeader from '$lib/components/ChannelHeader.svelte';
	import ChannelSchedule from '$lib/components/ChannelSchedule.svelte';
	import type { LayoutServerData } from '../../../$types';
	import type { PageServerData } from './$types';

	// PageServerData and LayoutServerData
	export let data: PageServerData & LayoutServerData;
	let payload = data.payload!;
</script>

<ChannelHeader channel={data.channel} allowWatch userId={payload.sub} allowEdit={false} />
{#if data.schedule.length > 0}
	<ChannelSchedule originalSchedule={data.schedule} />
{/if}
