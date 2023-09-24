<script lang="ts">
	import '../../app.postcss';
	import Modal from '$lib/components/Modal.svelte';
	import Toaster from '$lib/components/Toaster.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import type { LayoutServerData } from './$types';
	import { tokenStore } from '$lib/stores/token.store';
	import Sidebar from '$lib/components/Sidebar.svelte';
	export let data: LayoutServerData;
	const routes: {
		name: string;
		path: string;
		icon: string;
		condition?: () => boolean;
	}[] = [
		{
			name: 'Browse',
			path: '/browse',
			icon: 'browse'
		},
		{
			name: 'About',
			path: '/about',
			icon: 'info'
		},
		{
			name: 'Channels',
			path: '/channels',
			icon: 'display_settings',
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

<div class="w-full h-full flex bg-transparent relative">
	<Sidebar {routes} />
	<div class="h-full w-full flex flex-col p-4 gap-4 bg-gray-900 relative overflow-y-auto">
		<slot />
	</div>
	<Modal />
	<Toaster />
	<Loading />
</div>
