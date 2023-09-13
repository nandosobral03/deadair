<script>
	import '../app.postcss';
</script>

<div class="w-full h-full flex flex-col bg-transparent relative">
	<nav class="w-screen flex justify-between absolute top-0 left-0 p-4">
		<span>Dead Air</span>
		<span class="text-white z-10">
			<a href="/" class="p-2">Home</a>
			<a href="/about" class="p-2">About</a>
		</span>
	</nav>

	<div class="flex w-full h-full bg-red-300">
		<div class="flex flex-col w-1/2 h-full bg-white justify-center items-center text-6xl">
			<span>
				Dead Air <span class="text-primary text-4xl"> noun </span> <br />
				<span class="text-gray-500 text-2xl">
					<span class="text-primary">" : </span>
					a period of silence especially during a broadcast
					<span class="text-primary">"</span>
				</span>
			</span>
			<a
				href="/browse"
				class="mt-8 px-8 py-4 bg-primary text-white text-2xl straight-shadow
				hover:bg-primary-hover transition-all
			"
			>
				Watch Now
			</a>
		</div>
		<div class="flex w-1/2 h-full relative">
			<img src="/side.jpg" alt="side" class="w-full h-full object-cover" />

			<div
				class="absolute bottom-36 -left-12 text-2xl text-white
				 bg-primary
				 p-8 w-3/4 lg:w-2/3 xl:w-1/2
				 straight-shadow
				 flex flex-col"
			>
				“Television knows no night. It is perpetual day. TV embodies our fear of the dark, of night,
				of the other side of things.”
				<br />
				<span class="text-sm text-gray-300 text-end w-100"> ― Jean Baudrillard </span>
			</div>
		</div>
	</div>
</div>
