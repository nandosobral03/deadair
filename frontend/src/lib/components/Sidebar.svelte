<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { tokenStore } from '$lib/stores/token.store';
	import Icon from './Icon.svelte';

	export let routes: {
		name: string;
		path: string;
		icon: string;
		condition?: () => boolean;
	}[];
	let screenWidth = 0;
	export let expanded = false;

	if (browser) {
		screenWidth = window.innerWidth;
		if (screenWidth < 768) {
			expanded = false;
		} else {
			expanded = true;
		}
	}
</script>

<svelte:window on:resize={() => (screenWidth = window.innerWidth)} />

{#if screenWidth < 768}
	{#if expanded}
		<script>
			expanded = false;
		</script>
	{/if}
{/if}

<nav
	class="h-full bg-gray-950 text-gray-100
    flex flex-col gap-6 p-2 justify-start
    border-r-2
    border-primary
	transform transition-all duration-200 ease-in-out
	"
	style={expanded ? 'width: 12rem;' : 'width: 4rem;'}
>
	<div class="flex w-full items-center justify-center gap-6">
		{#if expanded}
			<a href="/">
				<img src="/favicon.png" alt="Logo" class="w-16" />
			</a>
		{/if}
		<button class="text-gray-200 hoverable mt-4" on:click={() => (expanded = !expanded)}>
			<Icon icon={expanded ? 'segment' : 'menu'} />
		</button>
	</div>

	<section class="flex flex-col gap-4">
		{#each routes.filter((route) => !route.condition || route.condition()) as route}
			<a
				class="flex items-center p-2 hover:bg-gray-700 cursor-pointer rounded-md transition-all duration-200 ease-in-out"
				class:bg-primary-dim={$page.url.pathname === `${route.path}`}
				class:text-gray-800={$page.url.pathname === `${route.path}`}
				class:px-auto={!expanded}
				href={route.path}
			>
				<Icon icon={route.icon} />
				{#if expanded}
					<span class="ml-4"> {route.name} </span>
				{/if}
			</a>
		{/each}
	</section>

	<div class="mt-auto w-full">
		{#if $tokenStore}
			<form class="contents" action="/logout" method="POST">
				<button
					class="flex w-full items-center p-2 hover:bg-gray-700 cursor-pointer rounded-md transition-all duration-200 ease-in-out"
					class:bg-primary-dim={$page.url.pathname === '/login'}
					class:px-auto={!expanded}
					type="submit"
				>
					<Icon icon="logout" />
					{#if expanded}
						<span class="ml-4"> Logout </span>
					{/if}
				</button>
			</form>
		{:else}
			<a
				class="flex items-center p-2 hover:bg-gray-700 cursor-pointer rounded-md transition-all duration-200 ease-in-out"
				class:bg-primary-dim={$page.url.pathname === '/login'}
				class:px-auto={!expanded}
				href="/login"
			>
				<Icon icon="login" />
				{#if expanded}
					<span class="ml-4"> Login </span>
				{/if}
			</a>
		{/if}
	</div>
</nav>

<style lang="scss">
	// Define keyframes for closing and opening the sidebar
	@keyframes close {
		from {
			justify-content: flex-start;
		}
		50% {
			justify-content: flex-start;
		}
		53% {
			justify-content: center;
		}
		to {
			justify-content: center;
		}
	}

	.closed {
		animation-name: close;
		animation-duration: 0.3s;
		animation-fill-mode: forwards;
		animation-delay: 0s;
	}
</style>
