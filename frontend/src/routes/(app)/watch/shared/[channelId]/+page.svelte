<script lang="ts">
	import type { ScheduleGet } from '$lib/model/schedule.model';
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	export let data: PageData;
	let shown = true;
	let upcomingVideo: ScheduleGet | null = null;
	let originalSchedule: ScheduleGet[] = data.schedule;
	dayjs.extend(duration);
	let schedule: ScheduleGet[] = [...originalSchedule];

	export const timeSinceWeekStart = () => {
		let now = dayjs();
		let monday = now.startOf('week');
		let secondsSinceMonday = now.diff(monday, 'second');
		return secondsSinceMonday;
	};

	onMount(() => {
		if (schedule.length === 0) return;
		let totalDuration = schedule.reduce((acc, curr) => acc + curr.duration, 0);
		let current = 0;
		while (totalDuration < 7 * 24 * 60 * 60) {
			schedule.push({
				...schedule[current],
				startTime: totalDuration,
				endTime: totalDuration + schedule[current].duration
			});
			totalDuration += schedule[current].duration;
			current++;
		}

		const currentTime = timeSinceWeekStart();
		let currentVideoIndex = 0;

		for (let i = 0; i < schedule.length; i++) {
			if (schedule[i].startTime <= currentTime && schedule[i].endTime > currentTime) {
				currentVideoIndex = i;
			}
		}
		let before = schedule.slice(0, currentVideoIndex);
		let after = schedule.slice(currentVideoIndex);
		schedule = [...after, ...before];

		const interval = setInterval(() => {
			let currentVideo = schedule[0];
			const currentTime = timeSinceWeekStart();
			if (currentVideo.endTime - 10 < currentTime) {
				upcomingVideo = schedule[1];
			} else {
				upcomingVideo = null;
			}

			if (currentVideo.endTime < currentTime) {
				shown = false;
				currentVideoIndex++;
				currentVideo = schedule[currentVideoIndex];
				const last = schedule.shift();
				if (last) schedule.push(last);
				schedule = schedule;
				shown = true;
			}
		}, 1000);

		return () => {
			clearTimeout(interval);
		};
	});

	$: currentVideoUrl =
		schedule.length > 0
			? `https://www.youtube.com/embed/${schedule[0].videoId}?start=${
					timeSinceWeekStart() - schedule[0].startTime
			  }&rel=0&controls=1&autoplay=1&mute=0`
			: '';
</script>

<svelte:head>
	<title
		>DA: {data.channel.name} - {schedule.length > 0
			? schedule[0].title
			: 'No videos scheduled'}</title
	>
</svelte:head>

{#if shown}
	<iframe
		src={currentVideoUrl}
		frameborder="0"
		allow="autoplay; encrypted-media"
		allowfullscreen
		title="Embedded youtube"
		class="w-full h-full"
	/>
{/if}
{#if upcomingVideo}
	<div transition:fade class="absolute top-0 right-0 w-128 h-32 m-4">
		<div class="bg-gray-950 bg-opacity-80 rounded-lg p-4 flex gap-4">
			<img src={upcomingVideo.thumbnail} class="w-32 h-24 rounded-lg" alt="" />
			<div class="flex flex-col gap-1 flex-grow">
				<span class="text-primary text-md"> Up next: </span>
				<div class="text-white text-sm">
					{upcomingVideo.title}
				</div>
				<div class="text-white text-sm w-full text-end">
					{dayjs.duration(upcomingVideo.startTime, 'seconds').format('HH:mm:ss')} - {dayjs
						.duration(upcomingVideo.endTime, 'seconds')
						.format('HH:mm:ss')}
				</div>
			</div>
		</div>
	</div>
{/if}

{#if schedule.length == 0}
	<!-- ADD EMPTY STATE -->
	<div class="text-center text-white">No videos scheduled</div>
{/if}
