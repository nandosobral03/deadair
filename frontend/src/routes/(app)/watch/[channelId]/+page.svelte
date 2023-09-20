<script lang="ts">
	import type { ScheduleGet } from '$lib/model/schedule.model';
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let shown = true;
	let originalSchedule: ScheduleGet[] = data.schedule;
	dayjs.extend(duration);
	let schedule: ScheduleGet[] = [...originalSchedule];

	export const timeSinceWeekStart = () => {
		let now = dayjs();
		let monday = now.startOf('week');
		let secondsSinceMonday = now.diff(monday, 'second');
		return secondsSinceMonday;
	};

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

	onMount(() => {
		const interval = setInterval(() => {
			console.log('asd');
			let currentVideo = schedule[0];
			const currentTime = timeSinceWeekStart();
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
	let currentVideoUrl = `https://www.youtube.com/embed/${schedule[0].videoId}?start=${
		timeSinceWeekStart() - schedule[0].startTime
	}&rel=0&controls=1&autoplay=1&mute=0`;
</script>

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
