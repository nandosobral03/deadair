<script lang="ts">
	import ChannelHeader from '$lib/components/ChannelHeader.svelte';
	import ChannelSchedule from '$lib/components/ChannelSchedule.svelte';
	import Empty from '$lib/components/Empty.svelte';
	import type { LayoutServerData } from '../../$types';
	import type { PageServerData } from './$types';

	export let data: PageServerData & LayoutServerData;
	let payload = data.payload;
</script>

<ChannelHeader
	channel={data.channel}
	allowWatch={data.schedule.length > 0}
	userId={payload?.sub}
	allowEdit={false}
/>
{#if data.schedule.length > 0}
	<ChannelSchedule originalSchedule={data.schedule} />
{:else}
	<div class="h-3/5 text-center">
		<Empty
			message={`No videos scheduled ${
				data.channel.userId
					? data.channel.userId == payload?.sub
						? '<br> Add some in the channels tab'
						: '<br> Tell the channel owner to add some!'
					: 'yet <br> Come back later'
			}`}
		/>
	</div>
{/if}
