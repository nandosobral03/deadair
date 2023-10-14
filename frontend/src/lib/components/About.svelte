<script lang="ts">
	export let id: string;
	export let title: string;
	export let image: string;
	export let description: string;
	export let inverted: boolean;
</script>

<div
	{id}
	class="w-full flex gap-4 bg-gray-900 p-8 min-h-screen md:min-h-0 flex-col md:flex-row"
	class:flex-col-reverse={inverted}
	class:md:flex-row-reverse={inverted}
>
	<div
		class="text-gray-100 text-justify bg-primary p-8 white-straight-shadow w-full md:w-1/2 flex flex-col gap-12"
	>
		<h1 class="text-4xl font-semibold text-gray-100 underline underline-offset-4">
			{title}
		</h1>
		<p class="text-lg text-gray-100">
			{@html description}
		</p>
	</div>
	<div class="w-1/2 flex justify-center items-center">
		<img src={`/${image}`} alt={id} class="max-w-full h-auto" />
	</div>
</div>
