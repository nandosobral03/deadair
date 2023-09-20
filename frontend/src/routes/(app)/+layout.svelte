<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import '../../app.postcss';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { modalStore } from '$lib/stores/modal.store';
	import Modal from '$lib/components/Modal.svelte';
	import Toaster from '$lib/components/Toaster.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { browser } from '$app/environment';

	const routes: {
		name: string;
		path: string;
		icon: string;
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
			name: 'Login',
			path: '/login',
			icon: 'login'
		}
	];
</script>

<div class="w-full h-full flex bg-transparent relative">
	<nav
		class="w-1/5 h-full bg-gray-800 text-gray-100
			flex flex-col p-2 gap-2 justify-between
			border-r-2
			border-primary"
	>
		<section>
			<span class="text-primary text-2xl p-4"> Dead Air </span>
			{#each routes as route}
				<a
					class="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
					class:bg-primary={$page.url.pathname === `${route.path}`}
					href={route.path}
				>
					<Icon icon={route.icon} /> <span class="ml-4"> {route.name} </span>
				</a>
			{/each}
		</section>

		{#if browser && localStorage.getItem('x-api-key')}
			<a href="/admin" class="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
				<Icon icon="settings" /> <span class="ml-4"> Admin </span>
			</a>
		{/if}
	</nav>
	<div class="h-full w-full flex flex-col p-4 gap-4 bg-gray-900 relative">
		<slot />
	</div>
	<Modal />
	<Toaster />
	<Loading />
</div>
