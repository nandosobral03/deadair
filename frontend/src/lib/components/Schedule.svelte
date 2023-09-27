<script lang="ts">
	import { draggable, dropzone } from '$lib/logic/dragndrop';
	import type { ScheduleCreate, ScheduleCreateRequest } from '$lib/model/schedule.model';
	import type { Video } from '$lib/model/video.model';
	import { v4 } from 'uuid';
	import duration from 'dayjs/plugin/duration';
	import dayjs from 'dayjs';
	export let schedule: ScheduleCreate[] = [];
	export let videos: Video[] = [];
	export let channel: Channel;
	import Progress from './Progress.svelte';
	import ScheduleVideo from './ScheduleVideo.svelte';
	import Divider from './Divider.svelte';
	import VideoPreview from './VideoPreview.svelte';
	import { page } from '$app/stores';
	import { putScheduleAPI } from '$lib/utils/schedule';
	import { toastStore } from '$lib/stores/toast.store';
	import type { Channel } from '$lib/model/channel.model';
	import { tokenStore } from '$lib/stores/token.store';
	import { parseHTTPError } from '$lib/utils/error';

	dayjs.extend(duration);
	$: total = dayjs.duration(
		schedule.reduce((acc, curr) => {
			return acc + curr.duration;
		}, 0),
		's'
	);

	const handleSave = async (schedule: ScheduleCreate[]) => {
		let items: ScheduleCreateRequest[] = schedule.map((s) => {
			return {
				channelId: channel.id,
				videoId: s.videoId,
				startTime: s.startTime,
				endTime: s.startTime + s.duration
			};
		});
		try {
			console.log(channel);
			await putScheduleAPI(items, channel.id, $tokenStore!, channel.userId ? 'user' : 'public');
			toastStore.addToast({
				title: 'Success',
				text: 'Schedule updated',
				type: 'success'
			});
		} catch (e) {
			toastStore.addToast({
				title: 'Error',
				text: parseHTTPError(e, 'Failed to update schedule'),
				type: 'error'
			});
		}
	};

	const handleDrop = (index: number) => {
		return (data: string) => {
			{
				const item = JSON.parse(data);
				if (item.scheduleId) {
					schedule = schedule.filter((s) => s.scheduleId !== item.scheduleId);
				} else {
					if (total.asSeconds() > 7 * 24 * 60 * 60) {
						return;
					}
				}

				const scheduleItem = {
					scheduleId: v4(),
					videoId: item.id,
					duration: item.duration,
					startTime: 0,
					thumbnail: item.thumbnail,
					title: item.title
				};
				const s = [...schedule.slice(0, index + 1), scheduleItem, ...schedule.slice(index + 1)];

				s.reduce((acc, curr) => {
					curr.startTime = acc;
					return acc + curr.duration;
				}, 0);
				schedule = s;
			}
		};
	};
</script>

<span class="text-gray-200">
	<span class="w-full flex flex-row justify-start items-center gap-4 p-2">
		{#if total.asHours() > 24}
			{total.format('D [days], HH:mm:ss')}
		{:else}
			{total.format('HH:mm:ss')}
		{/if}
		{#if total.asSeconds() > 7 * 24 * 60 * 60}
			<p class="text-red-500">Videos over the 7 day limit will be cut off</p>
		{/if}
	</span>
	<Progress current={total.asSeconds()} total={7 * 24 * 60 * 60} />
</span>
<div class="flex w-full h-full overflow-x-hidden gap-4">
	<div
		class="flex flex-col w-3/4 mx-auto overflow-y-scroll h-full gap-2 relative px-4 overflow-x-hidden"
	>
		<button
			class="bg-primary rounded-md p-2 hover:bg-primary-hover text-gray-800"
			on:click={() => {
				handleSave(schedule);
			}}
			>Save Schedule
		</button>
		{#if schedule.length == 0}
			<div class="text-gray-200 h-full text-center flex flex-col justify-center items-center">
				<img src="/empty.png" alt="Placeholder" class="w-1/2 mx-auto" />
				<p>No schedule items yet! Add one by dragging a video from the sidebar.</p>
			</div>
			<div
				class="flex flex-row h-full rounded-md absolute z-30 w-full"
				use:dropzone={{
					on_dropzone: handleDrop(-1)
				}}
			/>
		{/if}
		{#each schedule as item, index}
			<div
				class="flex flex-row p-2 bg-gray-950 rounded-md relative hover:bg-gray-800 mx-4"
				use:draggable={JSON.stringify({
					...item,
					id: item.videoId
				})}
			>
				<div
					class="w-full h-1/4 absolute top-0 left-0 top-drop"
					use:dropzone={{
						on_dropzone: handleDrop(index - 1)
					}}
				/>

				<div
					class="w-full h-1/4 absolute bottom-0 left-0 bottom-drop"
					use:dropzone={{
						on_dropzone: handleDrop(index)
					}}
				/>
				<ScheduleVideo
					showDelete
					{item}
					on:delete={() => (schedule = schedule.filter((s) => s.scheduleId !== item.scheduleId))}
				/>
			</div>
		{/each}
		<div
			class="flex flex-row flex-grow bg-gray-900 rounded-md"
			use:dropzone={{
				on_dropzone: handleDrop(schedule.length - 1)
			}}
		/>
	</div>
	<Divider vertical class="bg-primary" />
	<div class="flex flex-col w-1/4 gap-2 mx-4 overflow-y-scroll">
		<a
			href="/channel/{channel.channelNumber}/videos"
			class="bg-primary rounded-md p-2 hover:bg-primary-hover text-gray-800 text-center

		">Manage videos</a
		>
		{#if videos.length == 0}
			<p class="text-gray-200">No videos yet! Manage this channel's videos</p>
		{/if}
		{#each videos as video}
			<VideoPreview {video} />
		{/each}
	</div>
</div>

<style lang="scss">
	div:global(.droppable) {
		&.top-drop {
			top: -0.25rem;
			border-top: 0.25rem solid red;
		}

		&.bottom-drop {
			bottom: -0.25rem;
			border-bottom: 0.25rem solid red;
		}

		* {
			pointer-events: none;
		}
	}
</style>
