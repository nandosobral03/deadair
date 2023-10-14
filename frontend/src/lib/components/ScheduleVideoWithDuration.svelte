<script lang="ts">
	import type { ScheduleCreate } from '$lib/model/schedule.model';
	import dayjs, { duration } from 'dayjs';
	import Icon from './Icon.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { browser } from '$app/environment';
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
		if (browser && window.innerWidth < 768) {
			return `${days[day].slice(0, 3)} ${duration.format('HH:mm')}`;
		}
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

<div class="flex flex-row items-center justify-between w-full h-fit p-2 gap-6 relative">
	{#if showDelete}
		<button class="absolute top-2 right-2 text-gray-100 hoverable" on:click={handleDelete}>
			<Icon icon="close" />
		</button>
	{/if}
	<div class="flex flex-col md:flex-row items-center justify-start gap-4 w-full">
		<img class="w-32 rounded-md" src={item.thumbnail} alt={item.videoId} />
		<div class="flex flex-col w-full h-full gap-1">
			<p
				class="text-gray-100 w-11/12 text-sm md:text-lg overflow-hidden overflow-ellipsis whitespace-nowrap mx-auto md:mx-0"
			>
				{item.title}
			</p>
			<p class="text-gray-100 w-11/12 mx-auto text-xs md:text-sm md:mx-0">
				{dayjs.duration(currentTime, 's').format('HH:mm:ss')}
				/
				{dayjs.duration(item.duration, 's').format('HH:mm:ss')}
			</p>
			<p class="text-gray-100 text-xs self-end w-fit">
				{`${getStartTime(item.startTime)} - ${getStartTime(item.startTime + item.duration)}`}
			</p>
		</div>
	</div>
</div>
