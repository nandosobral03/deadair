<script lang="ts">
	import ChannelHeader from '$lib/components/ChannelHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import dayjs from 'dayjs';
	import type { LayoutServerData } from '../../../$types';
	import type { PageServerData } from './$types';
	import { leaveChannelAPI, removeUserFromChannelAPI } from '$lib/utils/shared';
	import { tokenStore } from '$lib/stores/token.store';
	import { toastStore } from '$lib/stores/toast.store';
	import { parseHTTPError } from '$lib/utils/error';

	export let data: PageServerData & LayoutServerData;
	const payload = data.payload!;
	console.log(data);

	const handleDelete = async (userId: string) => {
		console.log(userId);
		try {
			if (userId == payload.sub) {
				leaveChannelAPI(data.channel.id, $tokenStore!);
				window.location.href = '/browse';
			} else {
				removeUserFromChannelAPI(data.channel.id, userId, $tokenStore!);
				window.location.reload();
			}
		} catch (e) {
			toastStore.addToast({
				type: 'error',
				title: 'Error',
				text: parseHTTPError(e, 'Error removing user from channel')
			});
		}
	};
</script>

<ChannelHeader
	channel={data.channel}
	allowEdit={false}
	userId={payload.sub}
	allowWatch={true}
	showUsers={false}
/>

{#each data.users as user}
	<div
		class="w-full h-16 bg-gray-950 p-4 flex items-center justify-between text-gray-50 rounded-md"
	>
		<span>
			{user.username} - {dayjs(user.createdAt).format('DD/MM/YYYY')}
		</span>
		{#if user.userId == payload.sub || data.channel.userId == payload.sub}
			<button on:click={() => handleDelete(user.userId)}>
				<Icon icon="delete" />
			</button>
		{/if}
	</div>
{/each}
