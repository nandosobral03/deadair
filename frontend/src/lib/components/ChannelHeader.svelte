<script lang="ts">
	import { browser } from '$app/environment';
	import Divider from '$lib/components/Divider.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Channel } from '$lib/model/channel.model';
	import ShareChannelModal from '$lib/modals/ShareChannel.modal.svelte';
	import { modalStore } from '$lib/stores/modal.store';
	import EditChannelModal from '$lib/modals/EditChannel.modal.svelte';
	import ConfirmModal from '$lib/modals/Confirm.modal.svelte';
	import { tokenStore } from '$lib/stores/token.store';
	import { deleteChannelAPI } from '$lib/utils/channel';
	export let allowWatch = false;
	export let userId: string | undefined;
	export let allowEdit = false;
	export let channel: Channel;
	export let showUsers = true;
	const handleError = (ev: any) => (ev.target.src = '/placeholder.svg');

	const handleShare = () => {
		modalStore.set({
			title: 'Share Channel',
			size: 'sm', // 'sm' | 'md' | 'lg' | 'xl
			component: ShareChannelModal,
			props: {
				channel
			}
		});
	};

	const handleEdit = () => {
		modalStore.set({
			title: 'Edit Channel',
			size: 'lg',
			component: EditChannelModal,
			props: {
				channel
			}
		});
	};

	const handleDelete = () => {
		modalStore.set({
			title: 'Delete Channel',
			size: 'xs',
			component: ConfirmModal,
			props: {
				message: 'Are you sure you want to delete this channel?',
				isDestructive: true,
				action: async () => {
					await deleteChannelAPI(channel.id, $tokenStore!, !channel.userId ? 'public' : 'user');
					window.location.href = !channel.userId ? '/admin' : '/channels';
				}
			}
		});
	};

	const getWatchUrl = () => {
		if (!channel.userId) {
			return `/watch/${channel.channelNumber}`;
		} else {
			if (channel.userId == userId) {
				return `/watch/${channel.channelNumber}`;
			} else {
				return `/watch/shared/${channel.id}`;
			}
		}
	};
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
	<div class="flex gap-4 absolute top-6 right-6">
		{#if showUsers}
			<a
				class="text-primary w-8 h-8 rounded-full flex items-center justify-center hoverable"
				href={`/channel/${channel.id}/users`}
			>
				<Icon icon="people" className="text-2xl" />
			</a>
		{/if}
		<button
			class="text-primary w-8 h-8 rounded-full flex items-center justify-center hoverable"
			on:click={handleShare}
		>
			<Icon icon="share" className="text-2xl" />
		</button>
		{#if allowEdit}
			<button
				class="text-primary w-8 h-8 rounded-full flex items-center justify-center hoverable"
				on:click={handleEdit}
			>
				<Icon icon="edit" className="text-2xl" />
			</button>
			<button
				class="text-primary w-8 h-8 rounded-full flex items-center justify-center hoverable"
				on:click={handleDelete}
			>
				<Icon icon="delete" className="text-2xl" />
			</button>
		{/if}
	</div>

	<div class="h-full max-w-3xl aspect-square p-4">
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
	<div class="flex flex-col gap-2 flex-grow h-full p-6 justify-between">
		<div class="flex flex-col gap-2">
			<h1 class="text-4xl text-primary opacity-100">{channel.name}</h1>
			<p class="text-gray-200 overflow-y-auto h-24">
				{channel.description}
			</p>
		</div>
		{#if allowWatch}
			<a
				class="flex items-center justify-center bg-primary rounded-md w-48 h-12 py-6 text-gray-800"
				href={getWatchUrl()}
			>
				Watch Now
				<Icon icon="play_arrow" />
			</a>
		{/if}
	</div>
</header>
