<script lang="ts">
	import { browser } from '$app/environment';
	import Divider from '$lib/components/Divider.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Channel } from '$lib/model/channel.model';
	export let allowWatch = false;
	export let channel: Channel;

	const handleError = (ev: any) => (ev.target.src = '/placeholder.svg');
</script>

<header
	class="w-full flex max-h-96 h-96 bg-gray-950 items-start justify-start
 p-3 relative rounded-md"
	style="height: 30vh;"
>
	<button
		class="text-primary w-8 h-8
	top-6 left-6 rounded-full flex items-center justify-center hoverable mr-6"
		on:click={() => window.history.back()}
	>
		<Icon icon="arrow_back" className="text-2xl" />
	</button>
	<div class="w-1/2 h-full max-w-3xl">
		{#if browser}
			<img
				class="object-cover h-full w-full place-content-start rounded-md"
				src={channel.thumbnail || '/placeholder.svg'}
				alt={channel.name}
				on:error={handleError}
			/>
		{/if}
	</div>
	<Divider vertical class="bg-primary mx-6" />
	<div class="flex flex-col gap-2 w-1/2 h-full p-6 justify-between">
		<div>
			<h1 class="text-4xl text-primary opacity-100">{channel.name}</h1>
			<p class="text-gray-200">{channel.description}</p>
		</div>
		{#if allowWatch}
			<a
				class="flex items-center justify-center bg-primary rounded-md w-48 h-12 text-gray-800"
				href="/watch/{channel.channelNumber}"
			>
				Watch Now
				<Icon icon="play_arrow" />
			</a>
		{/if}
	</div>
</header>
