<script lang="ts">
	import { browser } from '$app/environment';
	import ChannelHeader from '$lib/components/ChannelHeader.svelte';
	import Schedule from '$lib/components/Schedule.svelte';
	import type { LayoutServerData } from '../../$types';
	import type { PageServerData } from './$types';
	export let data: PageServerData & LayoutServerData;
	const payload = data.payload!;
</script>

<ChannelHeader channel={data.channel} allowEdit={true} userId={payload.sub} allowWatch={false} />
{#if browser}
	{#if window.innerWidth > 768}
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
	{:else}
		<div class="flex flex-col items-center justify-center h-full w-full text-gray-200 text-center">
			Channel schedule editing is not supported on mobile devices. Please use a desktop browser.
		</div>
	{/if}
{/if}
