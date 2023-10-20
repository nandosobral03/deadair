<script lang="ts">
	import type { PageData } from './$types';
	import WatchChannel from '$lib/components/WatchChannel.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import type { LayoutServerData } from '../../$types';
	import Icon from '$lib/components/Icon.svelte';
	export let data: PageData & LayoutServerData;
	import { sleepingStore, sleepingTimerStore } from '$lib/stores/sleeping.store';
	import { modalStore } from '$lib/stores/modal.store';
	import SleepingModal from '$lib/modals/Sleeping.modal.svelte';
	const sleep = () => {
		modalStore.set({
			title: 'Sleep',
			component: SleepingModal,
			props: {},
			size: 'sm'
		});
	};
	let showChat = false;
</script>

<div class="flex flex-col lg:flex-row gap-4 bg-gray-850 rounded-md p-4 w-full h-full relative">
	<button
		class="absolute top-2 right-2 text-gray-200 hoverable z-20 bg-primary p-2 rounded-md flex items-center justify-center"
		on:click={() => (showChat = !showChat)}
	>
		<Icon icon={showChat ? 'comments_disabled' : 'chat'} />
	</button>
	<button
		class="absolute top-16 right-2 text-gray-200 hoverable z-20 bg-primary p-2 rounded-md flex items-center justify-center"
		on:click={sleep}
	>
		{#if $sleepingTimerStore}
			<Icon icon="sleep_score" className="text-white animate-pulse" />
		{:else}
			<Icon icon="bedtime" className="text-white" />
		{/if}
	</button>
	{#if !$sleepingStore}
		<WatchChannel originalSchedule={data.schedule} channelName={data.channel.name} />
	{/if}
	{#if showChat}
		<Chat channel={data.channel.id} token={data.token} />
	{/if}
</div>
