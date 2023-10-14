<script lang="ts">
	export let message = '';
	export let image: '/empty.png' | '/empty-users.png' | '/empty-video.png' = '/empty.png';
</script>

<div class="w-full flex flex-col items-center justify-around h-full select-none">
	<img src={image} alt="logo" class="h-3/4" />
	<h1 class="text-lg text-gray-100 bg-primary straight-shadow p-2 px-6">
		{@html message}
	</h1>
</div>
