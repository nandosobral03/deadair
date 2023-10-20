<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { afterUpdate, onMount } from 'svelte';
	import Divider from './Divider.svelte';
	export let channel: string;
	export let token: string | undefined;
	let message = '';
	let socket: WebSocket;
	let chat: HTMLElement;
	let shouldScroll = true;
	let messages: { message: string; username: string; color: string; timestamp: string }[] = [];
	onMount(() => {
		const wsRoute = `${PUBLIC_API_URL.replaceAll('api', 'ws')
			.replace('ws', 'api')
			.replace('http', 'ws')}/channel/${channel}`;

		socket = new WebSocket(wsRoute);
		socket.onopen = () => {
			console.log('connected');
		};

		socket.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);
			messages = [...messages, { ...data, timestamp: new Date().getTime() }];
		});
	});

	const handleSend = () => {
		socket.send(JSON.stringify({ message, token }));
		message = '';
	};

	afterUpdate(() => {
		if (shouldScroll) {
			chat.scrollTop = chat.scrollHeight;
		}
	});
</script>

<div class="text-white flex flex-col lg:w-80 relative h-full">
	<div
		class="flex flex-col flex-grow w-full overflow-auto border-gray-100 border-opacity-5 rounded-md border-2 p-2 text-sm"
		bind:this={chat}
		on:scroll={() => (shouldScroll = chat.scrollTop === chat.scrollHeight - chat.clientHeight)}
	>
		{#if !shouldScroll}
			<button
				class="text-center text-white text-xs select-none
				bg-primary rounded-md px-4 py-2
				absolute top-0 left-0 right-0 mx-6 my-3"
				on:click={() => (shouldScroll = true)}
			>
				Go to bottom
			</button>
		{/if}
		{#each messages as message}
			<div class="text-white hover:bg-gray-100 hover:bg-opacity-5 rounded-md px-4 py-2 break-words">
				<span style={`color: ${message.color}`}>
					{message.username}
				</span>
				: {message.message}
				<span class="text-2xs text-gray-400 float-right mt-1 select-none">
					{#if message.timestamp}
						{new Date(message.timestamp).toLocaleTimeString()}
					{/if}
				</span>
			</div>
			<!-- Only show if not last -->
			<div class="last-of-type:hidden h-px bg-gray-100 bg-opacity-5 text-2xs" />
		{/each}
	</div>
	<Divider class="my-2" />
	<form on:submit|preventDefault={handleSend} class="flex gap-2" autocomplete="off">
		{#if !token}
			<div class="text-xs text-gray-400">You need to be logged in to send messages</div>
		{:else}
			<input
				type="text"
				class="border-2 w-full
			border-gray-100 border-opacity-5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent p-2 text-gray-300"
				bind:value={message}
				placeholder={'Send a message'}
				readonly={!token}
				disabled={!token}
			/>
			<button
				class="bg-primary hover:bg-primary-hover text-gray-100 py-2 px-4 rounded"
				type="submit"
				disabled={!token}
			>
				Send
			</button>
		{/if}
	</form>
</div>
