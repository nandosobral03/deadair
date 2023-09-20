<script lang="ts">
	import { loadingStore } from '$lib/stores/loading.store';
</script>

{#if $loadingStore.loading}
	<div
		class="
        absolute
        h-screen w-screen flex items-center justify-center bg-gray-950 top-0 left-0 z-50
        opacity-75
        "
	>
		<div class="flex flex-col items-center justify-center">
			<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
			<span class="text-gray-200 text-2xl mt-4">
				{$loadingStore.message || 'Loading...'}
			</span>
		</div>
	</div>
{/if}
