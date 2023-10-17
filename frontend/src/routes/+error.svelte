<script lang="ts">
	import '../app.postcss';
</script>

<div
	class="w-full h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden items-center justify-center
	bg-gradient-to-br to-red-400 from-primary relative
	"
>
	<div
		class="w-4/5 md:w-96 bg-gray-900 rounded-md shadow-lg p-6 flex flex-col gap-4 straight-shadow text-center"
	>
		<img src="/404.png" class="w-full m-auto" alt="404" />
		<h3 class="text-2xl text-white">It seems you are lost</h3>
		<h4 class="text-lg text-white">The page you're looking for doesn't exist.</h4>
		<a href="/" class="text-white bg-primary rounded-md h-12 flex items-center justify-center"
			>Go back home</a
		>
	</div>
</div>
