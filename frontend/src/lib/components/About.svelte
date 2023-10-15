<script lang="ts">
	export let id: string;
	export let title: string;
	export let image: string;
	export let description: string;
	export let inverted: boolean;
</script>

<div
	{id}
	class="w-full flex gap-4 bg-background p-4 min-h-screen md:min-h-0 flex-col md:flex-row"
	class:md:flex-row-reverse={inverted}
>
	<div class="w-full md:w-1/2 flex items-center justify-center">
		<div
			class="bg-primary p-8 text-gray-200 text-justify straight-shadow flex flex-col gap-8 w-full md:w-3/4"
		>
			<h1 class="text-xl md:text-3xl font-semibold text-gray-200 underline underline-offset-4">
				{title}
			</h1>
			<p class="text-sm md:text-lg text-gray-200">
				{@html description}
			</p>
		</div>
	</div>
	<div class="w-full md:w-1/2 flex justify-center items-center">
		<img src={`/${image}`} alt={id} class="max-w-full h-auto" />
	</div>
</div>
