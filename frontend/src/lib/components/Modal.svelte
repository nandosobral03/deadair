<script lang="ts">
	import { modalStore } from '$lib/stores/modal.store';
	import { fly } from 'svelte/transition';
</script>

{#if $modalStore}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div
		class="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
		on:click={(e) => modalStore.clear()}
		on:keydown={(e) => e.key === 'Escape' && modalStore.clear()}
		role="dialog"
	>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div
			class={`${
				$modalStore?.size || 'sm'
			} bg-gray-900 flex flex-col gap-4 p-6 z-30 straight-shadow`}
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="dialog"
			transition:fly={{ y: 100, duration: 150 }}
		>
			<header class="text-primary text-2xl border-b-primary border-b-2 pb-2">
				{$modalStore?.title}
			</header>
			<svelte:component this={$modalStore?.component} {...$modalStore?.props} />
		</div>
	</div>
{/if}

<style lang="scss">
	.xs {
		height: clamp(16rem, 20%, 20rem);
		width: 30rem;
	}

	.sm {
		height: clamp(24rem, 35%, 26rem);
		width: 30rem;
	}

	.md {
		height: clamp(24rem, 50%, 32rem);
		width: 40rem;
	}

	.lg {
		height: clamp(24rem, 70%, 40rem);
		width: 50rem;
	}
</style>
