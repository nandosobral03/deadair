<script lang="ts">
	import type { Channel } from '$lib/model/channel.model';
	import { toastStore } from '$lib/stores/toast.store';

	export let channel: Channel;

	const handleCopy = () => {
		navigator.clipboard.writeText(`${location.host}/channel/${channel.id}/join`);
		toastStore.addToast({
			type: 'success',
			title: 'Copied',
			text: 'Copied to clipboard'
		});
	};
</script>

<div class="flex flex-col gap-4 text-white justify-between h-full">
	<span class="text-md">
		Anyone with this link can join <b>{channel.name}</b> and watch it's scheduled content.
	</span>

	<a href="/channel/{channel.id}/join?title={channel.name}" class="rounded-lg p-4 text-center">
		<span class="text-primary break-all hover:text-primary-hover hover:underline">
			{location.host}/channel/{channel.id}/join?title={channel.name}
		</span>
	</a>
	<button class="rounded-lg p-4 text-center bg-primary" on:click={handleCopy}>
		Copy to clipboard
	</button>
</div>
