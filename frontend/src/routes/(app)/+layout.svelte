<script lang="ts">
	import '../../app.postcss';
	import Modal from '$lib/components/Modal.svelte';
	import Toaster from '$lib/components/Toaster.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import type { LayoutServerData } from './$types';
	import { tokenStore } from '$lib/stores/token.store';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { sleepingStore } from '$lib/stores/sleeping.store';
	export let data: LayoutServerData;
	const routes: {
		name: string;
		path: string;
		icon: string;
		highlightPaths?: string[];
		condition?: () => boolean;
	}[] = [
		{
			name: 'Browse',
			path: '/browse',
			icon: 'browse',
			highlightPaths: ['browse', 'watch']
		},
		{
			name: 'Channels',
			path: '/channels',
			icon: 'display_settings',
			highlightPaths: ['channel'],
			condition: () => !!data.token
		},
		{
			name: 'Admin',
			path: '/admin',
			icon: 'settings',
			condition: () => !!data.payload?.isAdmin
		}
	];
	tokenStore.set(data.token);
</script>

<svelte:head>
	<title>Dead Air</title>
</svelte:head>
<div class="w-full h-full flex bg-transparent relative">
	<Sidebar {routes} />
	<div class="h-full w-full flex flex-col p-2 md:p-4 gap-4 bg-background relative overflow-y-auto">
		<slot />
	</div>
	<Modal />
	<Toaster />
	<Loading />
	{#if $sleepingStore}
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div
			class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center"
			on:click={() => ($sleepingStore = false)}
			on:keydown={(e) => {
				if (e.key == 'Escape') {
					$sleepingStore = false;
				}
			}}
			role="dialog"
		>
			<div class="rounded-md p-2 md:p-4 flex flex-col gap-4">
				<div class="text-center text-2xl text-primary">Sleeping</div>
				<div class="text-center text-sm text-primary">Click anywhere to wake up</div>
			</div>
		</div>
	{/if}
</div>
