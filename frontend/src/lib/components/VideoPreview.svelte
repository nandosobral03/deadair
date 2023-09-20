<script lang="ts">
	import { draggable } from '$lib/logic/dragndrop';
	import type { Video } from '$lib/model/video.model';
	import dayjs, { duration } from 'dayjs';
	export let video: Video;
</script>

<div
	class="flex flex-col p-2 bg-gray-950 rounded-md relative hover:bg-gray-800 w-full"
	draggable="true"
	use:draggable={JSON.stringify(video)}
>
	<div class="flex flex-row">
		<img class="h-16 rounded-md" src={video.thumbnail} alt={video.title} />
		<div class="flex flex-col ml-2">
			<p class="text-gray-200 text-sm">{video.title}</p>
			<span class="flex flex-col justify-between items-start">
				<p class="text-gray-200 text-xs">{video.youtubeChannel}</p>
				<p class="text-gray-200 text-xs">
					{dayjs.duration(video.duration, 's').format('HH:mm:ss')}
				</p>
			</span>
		</div>
	</div>
</div>
