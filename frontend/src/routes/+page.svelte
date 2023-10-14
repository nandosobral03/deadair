<script>
	import '../app.postcss';
	import Divider from '$lib/components/Divider.svelte';
	import About from '$lib/components/About.svelte';
</script>

<div
	class="w-screen h-screen flex flex-col bg-transparent relative overflow-y-auto"
	style="width: calc(100vw - 6px);"
>
	<nav class="w-full flex justify-between absolute top-0 left-0 p-4">
		<a href="/" class="text-black"> Dead Air </a>
		<span class="text-gray-100 z-10">
			<a href="/browse" class="p-2">Home</a>
			<a href="#about" class="p-2">About</a>
		</span>
	</nav>

	<div class="flex w-full h-full bg-red-300 flex-col md:flex-row">
		<div
			class="flex flex-col md:w-1/2 bg-gray-100 justify-center items-center text-3xl md:text-6xl p-4 min-h-screen md:h-full"
		>
			<span>
				Dead Air <span class="text-primary text-2xl md:text-4xl"> noun </span> <br />
				<span class="text-gray-500 text-xl md:text-2xl">
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
		<div class="w-full md:w-1/2 relative min-h-screen md:h-full">
			<img src="/side.jpg" alt="side" class="w-full h-full object-cover" />
			<div
				class="absolute bottom-36 left-12 md:-left-12 text-2xl text-gray-100
				 bg-primary
				 p-8 w-3/4 lg:w-2/3 xl:w-1/2
				 straight-shadow
				 flex flex-col"
			>
				“Television knows no night. It is perpetual day. TV embodies our fear of the dark, of night,
				of the other side of things.”
				<br />
				<span class="text-sm text-gray-100 text-end w-100"> ― Jean Baudrillard </span>
			</div>
		</div>
	</div>
</div>
<nav
	class="w-full bg-gradient-to-br to-red-400 from-primary relative h-fit p-12 md:p-0 md:h-48 flex justify-center items-center gap-8 flex-col md:flex-row min-h-screen md:min-h-0"
>
	<a
		href="#about"
		class="px-4 py-2 bg-gray-900 text-gray-100 straight-shadow text-lg hover:bg-gray-800"
		>Dead air? What's that?</a
	>
	<a
		href="#vision"
		class="px-4 py-2 bg-gray-900 text-gray-100 straight-shadow text-lg hover:bg-gray-800"
		>Our Vision
	</a>
	<a
		href="#experience"
		class="px-4 py-2 bg-gray-900 text-gray-100 straight-shadow text-lg hover:bg-gray-800"
		>The Dead Air Experience
	</a>
	<a
		href="#why"
		class="px-4 py-2 bg-gray-900 text-gray-100 straight-shadow text-lg hover:bg-gray-800"
		>Why Dead Air?
	</a>
</nav>
<About
	id="about"
	title="Dead Air? What's that?"
	image="what.png"
	description="
Dear Air is your Gateway to Curated YouTube Broadcasts Welcome to Dead Air, your digital oasis
			for a unique YouTube viewing experience! We've revolutionized the way you consume YouTube
			content by transforming it into a television-like broadcast, complete with scheduled channels
			that let you jump into videos part-way and seamlessly continue watching."
/>
<About
	id="vision"
	title="Our Vision"
	image="vision.png"
	inverted
	description="
	At Dead Air, we believe in the power of curated content to bring people together, fostering a
	sense of shared experience in the vast digital landscape of YouTube. Our vision is to create a
	platform where you can escape the endless scrolling and algorithm-driven suggestions, and
	instead, immerse yourself in handpicked, thematic channels that offer something for everyone.
	<br />
	<br />
	From cooking shows to music concerts, educational talks to gaming sessions, Dead Air hosts a variety
	of channels curated to pique your curiosity and satisfy your interests."
/>

<About
	id="experience"
	title="The Dead Air Experience"
	image="experience.png"
	description="
	Imagine a world where you can tune in to your favorite YouTube content as if it were a TV
			broadcast. With Dead Air, that vision becomes a reality. We curate a diverse selection of
			channels, each with its own unique theme and schedule, carefully designed to cater to a wide
			range of interests.
			<br />
			<br />
			Don't like what's playing? No problem! Just switch to another channel, create your own and setup
			your own schedule of videos you enjoy. Then tune in and watch your favorites without having to
			search for them."
/>

<About
	id="why"
	title="Why Dead Air?"
	image="why.png"
	inverted
	description="
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
			love, chosen just for you."
/>
