<script>
	import '../app.postcss';
	import Divider from '$lib/components/Divider.svelte';
</script>

<div
	class="w-screen h-screen flex flex-col bg-transparent relative"
	style="width: calc(100vw - 6px);"
>
	<nav class="w-full flex justify-between absolute top-0 left-0 p-4">
		<a href="/" class="text-black"> Dead Air </a>
		<span class="text-gray-100 z-10">
			<a href="/browse" class="p-2">Home</a>
			<a href="#about" class="p-2">About</a>
		</span>
	</nav>

	<div class="flex w-full h-full bg-red-300">
		<div class="flex flex-col w-1/2 h-full bg-gray-100 justify-center items-center text-6xl">
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
				class="mt-8 px-8 py-4 bg-primary text-gray-100 text-2xl straight-shadow
				hover:bg-primary-hover transition-all
			"
			>
				Watch Now
			</a>
		</div>
		<div class="flex w-1/2 h-full relative">
			<img src="/side.jpg" alt="side" class="w-full h-full object-cover" />

			<div
				class="absolute bottom-36 -left-12 text-2xl text-gray-100
				 bg-primary
				 p-8 w-3/4 lg:w-2/3 xl:w-1/2
				 straight-shadow
				 flex flex-col"
			>
				“Television knows no night. It is perpetual day. TV embodies our fear of the dark, of night,
				of the other side of things.”
				<br />
				<span class="text-sm text-gray-900 text-end w-100"> ― Jean Baudrillard </span>
			</div>
		</div>
	</div>
</div>
<nav
	class="w-full bg-gradient-to-br to-red-200 from-primary relative h-48 flex justify-center items-center gap-8"
>
	<a href="#about" class="px-4 py-2 bg-gray-900 text-gray-100 straight-shadow text-lg"
		>Dead air? What's that?</a
	>
	<a href="#vision" class="px-4 py-2 bg-gray-900 text-gray-100 straight-shadow text-lg"
		>Our Vision
	</a>
	<a href="#experience" class="px-4 py-2 bg-gray-900 text-gray-100 straight-shadow text-lg"
		>The Dead Air Experience
	</a>
	<a href="#why" class="px-4 py-2 bg-gray-900 text-gray-100 straight-shadow text-lg"
		>Why Dead Air?
	</a>
</nav>

<div id="about" class="w-full h-96 flex gap-4 bg-gray-900 p-8">
	<div class="text-gray-900 text-justify bg-primary p-8 straight-shadow w-1/2 flex flex-col gap-12">
		<h1 class="text-4xl font-semibold text-gray-100">Dead Air? What's that?</h1>
		<p class="text-lg text-gray-900">
			Dear Air is your Gateway to Curated YouTube Broadcasts Welcome to Dead Air, your digital oasis
			for a unique YouTube viewing experience! We've revolutionized the way you consume YouTube
			content by transforming it into a television-like broadcast, complete with scheduled channels
			that let you jump into videos part-way and seamlessly continue watching.
		</p>
	</div>
	<img src="/side.jpg" alt="about" class="w-1/2 h-full object-cover" />
</div>

<div id="vision" class="w-full h-128 flex gap-4 bg-gray-900 p-8">
	<img src="/side.jpg" alt="about" class="w-1/2 h-full object-cover" />

	<div class="text-gray-900 text-justify bg-primary p-8 straight-shadow w-1/2 flex flex-col gap-12">
		<h1 class="text-4xl font-semibold text-gray-100">Our Vision</h1>
		<p class="text-lg text-gray-900">
			At Dead Air, we believe in the power of curated content to bring people together, fostering a
			sense of shared experience in the vast digital landscape of YouTube. Our vision is to create a
			platform where you can escape the endless scrolling and algorithm-driven suggestions, and
			instead, immerse yourself in handpicked, thematic channels that offer something for everyone.
			<br />
			<br />
			From cooking shows to music concerts, educational talks to gaming sessions, Dead Air hosts a variety
			of channels curated to pique your curiosity and satisfy your interests.
		</p>
	</div>
</div>

<div id="experience" class="w-full h-128 flex gap-4 bg-gray-900 p-8">
	<div class="text-gray-900 text-justify bg-primary p-8 straight-shadow w-1/2 flex flex-col gap-12">
		<h1 class="text-4xl font-semibold text-gray-100">The Dead Air Experience</h1>
		<p class="text-lg text-gray-900">
			Imagine a world where you can tune in to your favorite YouTube content as if it were a TV
			broadcast. With Dead Air, that vision becomes a reality. We curate a diverse selection of
			channels, each with its own unique theme and schedule, carefully designed to cater to a wide
			range of interests.
			<br />
			<br />
			Don't like what's playing? No problem! Just switch to another channel, create your own and setup
			your own schedule of videos you enjoy. Then tune in and watch your favorites without having to
			search for them.
		</p>
	</div>
	<img src="/side.jpg" alt="about" class="w-1/2 h-full object-cover" />
</div>

<div id="why" class="w-full h-144 flex gap-4 bg-gray-900 p-8">
	<img src="/side.jpg" alt="about" class="w-1/2 h-full object-cover" />

	<div class="text-gray-900 text-justify bg-primary p-8 straight-shadow w-1/2 flex flex-col gap-12">
		<h1 class="text-4xl font-semibold text-gray-100">Why Dead Air?</h1>
		<p class="text-lg text-gray-900">
			In a world overflowing with digital choices, Dead Air offers you a refreshing escape from the
			endless cycle of content discovery. It's the remedy for those moments when you simply want to
			relax, unwind, and enjoy something you know you'll love without having to search for it.
			<br />
			<br />
			Picture this: You want to have a video playing in the background while you work, cook, or simply
			lounge around. You don't want the hassle of browsing through countless videos or deciding what
			to watch next. That's where Dead Air steps in, providing you with the ideal solution.
			<br />
			<br />
			Dead Air is your gateway to effortless entertainment. Whether you're studying, working, or simply
			relaxing, let Dead Air be the soundtrack to your day, enhancing your experience with content you
			love, chosen just for you.
		</p>
	</div>
</div>
