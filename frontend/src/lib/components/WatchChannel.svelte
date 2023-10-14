<script lang="ts">
	import type { ScheduleGet } from '$lib/model/schedule.model';
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import { sleepingStore, sleepingTimerStore } from '$lib/stores/sleeping.store';
	import { browser } from '$app/environment';
	import { modalStore } from '$lib/stores/modal.store';
	import SleepingModal from '$lib/modals/Sleeping.modal.svelte';
	import Empty from './Empty.svelte';
	let shown = true;
	let frame: HTMLIFrameElement;
	let upcomingVideo: ScheduleGet | null = null;
	export let originalSchedule: ScheduleGet[];
	export let channelName: string;
	dayjs.extend(duration);
	let schedule: ScheduleGet[] = [...originalSchedule];

	export const timeSinceWeekStart = () => {
		let now = dayjs();
		let monday = now.startOf('week');
		let secondsSinceMonday = now.diff(monday, 'second');
		return secondsSinceMonday;
	};

	let interval: NodeJS.Timeout | null = null;

	onMount(() => {
		startInterval();
		return () => {
			clear();
		};
	});

	const clear = () => {
		if (interval) clearInterval(interval);
		interval = null;
	};

	const startInterval = () => {
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

		console.log('Interval started');
		console.log(schedule);
		setCurrentVideoUrl();
		interval = setInterval(() => {
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
				setCurrentVideoUrl();
				shown = true;
			}
		}, 1000);
	};

	const setCurrentVideoUrl = () => {
		currentVideoUrl =
			schedule.length > 0
				? `https://www.youtube.com/embed/${schedule[0].videoId}?start=${
						timeSinceWeekStart() - schedule[0].startTime
				  }&rel=0&controls=1&autoplay=1&mute=0&enablejsapi=1&allowfullscreen=1`
				: '';
	};

	let currentVideoUrl = '';

	$: {
		if (browser) {
			if ($sleepingStore) {
				frame?.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
				frame?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
				console.log('sleep', interval);
				if (interval) {
					clear();
					console.log('cleared');
					console.log(interval);
				}
			} else {
				frame?.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
				frame?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
				console.log('start', interval);
				if (!interval) {
					startInterval();
				}
			}
		}
	}

	const sleep = () => {
		modalStore.set({
			title: 'Sleep',
			component: SleepingModal,
			props: {},
			size: 'sm'
		});
	};
</script>

<svelte:head>
	<title
		>DA: {channelName} - {schedule.length > 0 ? schedule[0].title : 'No videos scheduled'}</title
	>
</svelte:head>

{#if schedule.length == 0}
	<Empty message="No videos are scheduled in this channel, how did you even get here?" />
{:else if shown}
	<div class="w-full h-full relative">
		<iframe
			src={currentVideoUrl}
			frameborder="0"
			allow="autoplay; encrypted-media; fullscreen"
			allowfullscreen={true}
			title="Embedded youtube"
			class="w-full h-full"
			bind:this={frame}
		/>
		<button class="absolute top-12 right-0 py-4 px-6" on:click={sleep}>
			{#if $sleepingTimerStore}
				<Icon icon="sleep_score" className="text-white animate-pulse" />
			{:else}
				<Icon icon="bedtime" className="text-white" />
			{/if}
		</button>
		{#if upcomingVideo}
			<div transition:fade class="absolute top-0 right-0 w-128 h-32 m-12">
				<div class="bg-gray-950 bg-opacity-80 rounded-md p-4 flex gap-4">
					<img src={upcomingVideo.thumbnail} class="w-32 h-24 rounded-md" alt="" />
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
	</div>
{/if}
