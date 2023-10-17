<script lang="ts">
	import { uploadImage } from '$lib/utils/image';
	import { createChannelAPI, updateChannelAPI } from '$lib/utils/channel';
	import { toastStore } from '$lib/stores/toast.store';
	import TooltippedInput from '$lib/components/TooltippedInput.svelte';
	import { modalStore } from '$lib/stores/modal.store';
	import { loadingStore } from '$lib/stores/loading.store';
	import { tokenStore } from '$lib/stores/token.store';
	export let type: 'user' | 'public' = 'public';
	let thumbnail: File | null = null;
	let form = {
		name: {
			value: '',
			error: '',
			validator: (value: any) => {
				if (value.length < 3) {
					return 'Name must be at least 3 characters long!';
				}
				return '';
			}
		},
		description: {
			value: '',
			error: '',
			validator: (value: any) => {
				if (value.length < 3) {
					return 'Description must be at least 3 characters long!';
				}
				return '';
			}
		},
		channelNumber: {
			value: 0,
			error: '',
			validator: (value: any) => {
				if (value < 1 || value > 9999) {
					return 'Channel number must be between 0 and 9999!';
				}
				return '';
			}
		}
	};

	const getValues = () => {
		const values: any = {};
		const keys = Object.keys(form) as (keyof typeof form)[];
		for (const key of keys) {
			values[key] = form[key].value;
		}
		return values;
	};

	const validateForm = () => {
		const keys = Object.keys(form) as (keyof typeof form)[];
		let isValid = true;
		for (const key of keys) {
			const value = form[key].value;
			const error = form[key].validator(value);
			form[key].error = error;
			if (error) {
				isValid = false;
			}
		}
		return isValid;
	};

	const createChannel = async () => {
		if (!validateForm()) return;
		let { name, description, channelNumber } = getValues();
		try {
			loadingStore.setLoading(true);
			const { id } = await createChannelAPI(name, description, channelNumber, $tokenStore!, type);
			toastStore.addToast({
				type: 'success',
				title: 'Channel Created',
				text: `Channel ${name} was created successfully!`
			});
			if (thumbnail) {
				try {
					const imageData = await uploadImage(thumbnail, $tokenStore!);
					const imageURL = imageData.data.link;
					await updateChannelAPI(
						id,
						name,
						description,
						channelNumber,
						imageURL,
						$tokenStore!,
						type
					);
				} catch {
					toastStore.addToast({
						type: 'error',
						title: 'Channel Creation Failed',
						text: `Channel thumbnail could not be uploaded!`
					});
				}
			}
			modalStore.clear();
		} catch (error: any) {
			toastStore.addToast({
				type: 'error',
				title: 'Channel Creation Failed',
				text: `${error?.response?.data?.message || 'Something went wrong!'}`
			});
		} finally {
			loadingStore.setLoading(false);
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
			<TooltippedInput class="flex-grow" item={form.name} placeholder="'Essays'" type="text" />
			<TooltippedInput class="w-16" item={form.channelNumber} placeholder="'50'" type="number" />
		</div>
		<TooltippedInput
			class="w-full"
			item={form.description}
			placeholder="'Informative videos about all types of things'"
			type="textarea"
		/>

		<div class="flex gap-2 justify-end w-full">
			{#if thumbnail}
				<img
					src={URL.createObjectURL(thumbnail)}
					class="w-1/5 aspect-square m-auto"
					alt="Thumbnail"
				/>
			{/if}

			<button
				class="w-64 bg-primary text-white rounded-md p-2 shadow-md hover:bg-primary-hover h-10"
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
