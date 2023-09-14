<script lang="ts">
	export let item: {
		value: any;
		error: string;
		validator: (value: any) => string;
	};
	export let placeholder: string;
	export let type: 'text' | 'password' | 'number' | 'textarea' = 'text';
	let tooltipVisible = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={$$props.class + ' relative'}
	on:mouseenter={() => (item.error ? (tooltipVisible = true) : null)}
	on:mouseleave={() => (tooltipVisible = false)}
>
	{#if item.error && tooltipVisible}
		<div
			class="absolute z-10 bg-red-500 text-white p-2 rounded-md shadow-md -top-12 transform -translate-x-1/2
			w-max whitespace-nowrap
			"
		>
			{item.error}
		</div>
	{/if}
	{#if type == 'text'}
		<input
			bind:value={item.value}
			on:input={() => (item.error = item.validator(item.value))}
			type="text"
			{placeholder}
			class="border-2 w-full
				 border-gray-100 border-opacity-5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent p-2 text-gray-300"
			class:invalid={item.error}
		/>
	{/if}
	{#if type == 'password'}
		<input
			bind:value={item.value}
			on:input={() => (item.error = item.validator(item.value))}
			type="password"
			{placeholder}
			class="border-2 w-full
				 border-gray-100 border-opacity-5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent p-2 text-gray-300"
			class:invalid={item.error}
		/>
	{/if}
	{#if type == 'number'}
		<input
			bind:value={item.value}
			on:input={() => (item.error = item.validator(item.value))}
			type="number"
			{placeholder}
			class="border-2 w-full
				 border-gray-100 border-opacity-5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent p-2 text-gray-300"
			class:invalid={item.error}
		/>
	{/if}
	{#if type == 'textarea'}
		<textarea
			bind:value={item.value}
			on:input={() => (item.error = item.validator(item.value))}
			{placeholder}
			class="border-2 border-gray-100 border-opacity-5
			w-full
			 rounded-md focus:outline-none focus:ring-2
			 focus:ring-primary focus:border-transparent bg-transparent p-2
			  text-gray-300
					h-32 resize-none"
			class:invalid={item.error}
		/>
	{/if}
</div>

<style>
	.invalid {
		border-color: #ff0000;
	}
</style>
