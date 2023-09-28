<script lang="ts">
	import ChannelHeader from '$lib/components/ChannelHeader.svelte';
	import Schedule from '$lib/components/Schedule.svelte';
	import type { LayoutServerData } from '../../$types';
	import type { PageServerData } from './$types';
	export let data: PageServerData & LayoutServerData;
	const paylaod = data.payload!;
</script>

<ChannelHeader channel={data.channel} allowEdit={true} userId={paylaod.sub} allowWatch={true} />
<Schedule
	channel={data.channel}
	videos={data.videos}
	schedule={data.schedule.map((s, index) => {
		return {
			...s,
			scheduleId: index + '',
			duration: s.endTime - s.startTime,
			thumbnail: data.videos.find((v) => v.id === s.videoId)?.thumbnail || '',
			title: data.videos.find((v) => v.id === s.videoId)?.title || ''
		};
	})}
/>
