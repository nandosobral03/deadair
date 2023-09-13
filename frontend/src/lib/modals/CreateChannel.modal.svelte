<script lang="ts">
	import axios from 'axios';
	import { PUBLIC_API_URL } from '$env/static/public';
	let type = 'public';
	let name = '';
	let description = '';
	let channelNumber = 0;
	let thumbnail: File | null = null;

	const validateInput = () => {};

	const createChannel = async () => {
		validateInput();
		if (type == 'public') {
			const data = await axios.post(
				`${PUBLIC_API_URL}admin/channel/`,
				{
					name,
					description,
					channelNumber,
					thumbnail: ''
				},
				{
					headers: {
						'x-api-key': localStorage.getItem('x-api-key')
					}
				}
			);
			console.log(data);
		}
	};

	let fileInput: HTMLInputElement;

	const handleFileInput = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file: File = (target.files as FileList)[0];
		thumbnail = file;
	};
</script>

<div class="flex flex-col justify-between w-full h-full">
	<div class="flex flex-col gap-4 w-full">
		<div class="w-full flex gap-2">
			<input
				bind:value={name}
				type="text"
				placeholder="'Essays'"
				class="border-2 flex-grow
				 border-gray-100 border-opacity-5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent p-2 text-gray-300"
			/>

			<input
				type="number"
				bind:value={channelNumber}
				class="border-2 border-gray-100 border-opacity-5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent p-2 text-gray-300"
				min="0"
				max="9999"
				step="1"
			/>
		</div>
		<textarea
			bind:value={description}
			placeholder="'Informative videos about all types of things'"
			class="border-2 border-gray-100 border-opacity-5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent p-2 text-gray-300
			h-32 resize-none
			"
		/>
		<div class="flex gap-2 justify-end w-full">
			<button
				class="w-1/2 bg-primary text-white rounded-md p-2 shadow-md hover:bg-primary-hover"
				on:click={() => fileInput.click()}
			>
				Upload Thumbnail
			</button>
		</div>
	</div>
	<button
		class="w-full bg-primary text-white rounded-md p-2 shadow-md hover:bg-primary-hover"
		on:click={createChannel}>Create Channel</button
	>
</div>

<input type="file" class="hidden" bind:this={fileInput} on:change={handleFileInput} />
