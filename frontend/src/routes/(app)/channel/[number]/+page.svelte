<script lang="ts">
	import ChannelHeader from '$lib/components/ChannelHeader.svelte';
	import Schedule from '$lib/components/Schedule.svelte';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	export let data: PageServerData;
	onMount(() => {
		invalidate($page.url);
	});
</script>

<ChannelHeader channel={data.channel} />
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
