<script lang="ts">
	import type { ScheduleCreate } from '$lib/model/schedule.model';
	import dayjs from 'dayjs';
	import Icon from './Icon.svelte';
	import { createEventDispatcher } from 'svelte';
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
		let day = duration.days() % 7;
		if (browser && window.innerWidth < 768) {
			return `${days[day].slice(0, 3)} ${duration.format('HH:mm')}`;
		}
		return `${days[day]} ${duration.format('HH:mm')}`;
	};
</script>

<div class="flex items-center justify-between w-full h-fit p-2 gap-6 relative">
	{#if showDelete}
		<button class="absolute top-2 right-2 text-gray-200 hoverable z-20" on:click={handleDelete}>
			<Icon icon="close" />
		</button>
	{/if}
	<div class="flex flex-col md:flex-row items-center justify-start gap-4 w-full">
		<img class="w-32 rounded-md" src={item.thumbnail} alt={item.videoId} />
		<div class="flex flex-col flex-grow max-w-full overflow-x-hidden h-full gap-1 w-full">
			<!-- max 1 line otherwise ... -->
			<p
				class="text-gray-200 w-11/12 text-sm md:text-lg overflow-hidden overflow-ellipsis whitespace-nowrap mx-auto md:mx-0"
			>
				{item.title}
			</p>
			<p class="text-gray-200 w-11/12 text-xs md:text-sm mx-auto md:mx-0">
				{dayjs.duration(item.duration, 's').format('HH:mm:ss')}
			</p>
			<p class="text-gray-400 text-xs self-end w-fit">
				{`${getStartTime(item.startTime)} - ${getStartTime(item.startTime + item.duration)}`}
			</p>
		</div>
	</div>
</div>
