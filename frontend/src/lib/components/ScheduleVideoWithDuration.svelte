<script lang="ts">
	import type { ScheduleCreate } from '$lib/model/schedule.model';
	import dayjs, { duration } from 'dayjs';
	import Icon from './Icon.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	export let item: ScheduleCreate;
	export let showDelete: boolean = false;
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dispatch = createEventDispatcher();

	const handleDelete = () => {
		dispatch('delete', item);
	};

	const getStartTime = (seconds: number) => {
		const duration = dayjs.duration(seconds, 's');
		let day = duration.days();
		return `${days[day]} ${duration.format('HH:mm')}`;
	};

	export const timeSinceWeekStart = () => {
		let now = dayjs();
		let monday = now.startOf('week');
		let secondsSinceMonday = now.diff(monday, 'second');
		return secondsSinceMonday;
	};

	let currentTime = timeSinceWeekStart() - item.startTime;

	onMount(() => {
		const interval = setInterval(() => {
			currentTime = Math.min(timeSinceWeekStart() - item.startTime, item.duration);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="flex flex-row items-center justify-between w-full h-24 p-2 gap-6 relative">
	{#if showDelete}
		<button class="absolute top-2 right-2 text-gray-800 hoverable" on:click={handleDelete}>
			<Icon icon="close" />
		</button>
	{/if}
	<div class="flex flex-row items-center justify-start gap-4 w-full">
		<img class="w-32 rounded-md" src={item.thumbnail} alt={item.videoId} />
		<div class="flex flex-col w-full h-full gap-1">
			<p class="text-gray-800 w-10/12 text-lg">{item.title}</p>
			<p class="text-gray-800 text-sm">
				{dayjs.duration(currentTime, 's').format('HH:mm:ss')}
				/
				{dayjs.duration(item.duration, 's').format('HH:mm:ss')}
			</p>
			<p class="text-gray-800 text-sm self-end w-fit">
				{`${getStartTime(item.startTime)} - ${getStartTime(item.startTime + item.duration)}`}
			</p>
		</div>
	</div>
</div>
