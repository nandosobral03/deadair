<script lang="ts">
	import type { ScheduleGet } from '$lib/model/schedule.model';
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	import ScheduleVideo from './ScheduleVideo.svelte';
	import { onMount } from 'svelte';
	import ScheduleVideoWithDuration from './ScheduleVideoWithDuration.svelte';
	import Divider from './Divider.svelte';
	export let originalSchedule: ScheduleGet[];
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
			let currentVideo = schedule[0];
			const currentTime = timeSinceWeekStart();
			if (currentVideo.endTime < currentTime) {
				currentVideoIndex++;
				currentVideo = schedule[currentVideoIndex];
				const last = schedule.shift();
				if (last) schedule.push(last);
				schedule = schedule;
			}
		}, 1000);
		return () => {
			clearTimeout(interval);
		};
	});
</script>

<div class="flex flex-col gap-4 overflow-y-auto">
	<div class="flex flex-row p-2 rounded-md relative bg-primary mx-4 straight-shadow">
		<ScheduleVideoWithDuration item={{ ...schedule[0], scheduleId: '1' }} />
	</div>
	<Divider class="min-h-fit" />
	{#each schedule.slice(1).slice(0, 100) as item}
		<div class="flex flex-row p-2 bg-gray-950 rounded-md relative hover:bg-gray-800 mx-4">
			<ScheduleVideo item={{ ...item, scheduleId: '1' }} />
		</div>
	{/each}
</div>
