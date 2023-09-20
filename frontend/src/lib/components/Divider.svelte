<script lang="ts">
	export let vertical: boolean = false;
	export let color: string = 'primary';
</script>

{#if vertical}
	<div class={` h-full w-px bg-${color} ${$$props.class}`} />
{:else}
	<div class={` w-full min-h-px h-px bg-${color} ${$$props.class}`} />
{/if}
