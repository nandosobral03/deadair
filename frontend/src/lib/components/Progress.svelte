<script lang="ts">
	export let current: number = 0;
	export let total: number = 0;
</script>

<div class="w-full h-1 bg-gray-950 rounded-md relative">
	<div
		class="absolute top-0 left-0 h-full bg-primary rounded-md z-10"
		style="width: {(current / total) * 100}%"
	/>
	<div
		class="absolute top-0 left-0 h-full bg-gray-950 rounded-md z-0"
		style="width: {((total - current) / total) * 100}%"
	/>
</div>
