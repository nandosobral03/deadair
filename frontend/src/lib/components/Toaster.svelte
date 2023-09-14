<script lang="ts">
	import ToastNotification from '$lib/components/ToastNotification.svelte';
	import { toastStore } from '$lib/stores/toast.store';
	import { flip } from 'svelte/animate';
</script>

<div class="fixed bottom-0 right-0 m-8 z-50 flex flex-col-reverse gap-4 h-screen">
	{#each $toastStore as notification (notification.timestamp)}
		<div animate:flip={{ duration: 300 }}>
			<ToastNotification {...notification} />
		</div>
	{/each}
</div>
