<script lang="ts">
	import Divider from '$lib/components/Divider.svelte';
	import '../../app.postcss';
	import TooltippedInput from '$lib/components/TooltippedInput.svelte';
	let type = 'login';
	let form = {
		username: {
			value: '',
			error: '',
			validator: (value: any) => {
				if (value.length < 3) {
					return 'Username must be at least 3 characters long';
				}
				return '';
			}
		},
		password: {
			value: '',
			error: '',
			validator: (value: any) => {
				if (value.length < 3) {
					return 'Password must be at least 3 characters long';
				}
				return '';
			}
		}
	};

	const changeModal = () => {
		type = type === 'login' ? 'signup' : 'login';
		form.username.error = '';
		form.password.error = '';
	};
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client"></script>
</svelte:head>

<div
	class="w-full h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden items-center justify-center
	bg-gradient-to-br to-orange-300 from-primary relative
	"
>
	<div class="flex justify-center items-center absolute top-12 right-12">
		<div
			id="g_id_onload"
			data-client_id="621044643291-dras0q5a30536q2m5dok6aonqohkp456.apps.googleusercontent.com"
			data-context="signin"
			data-ux_mode="popup"
			data-login_uri="http://localhost:5173/oauth"
			data-auto_prompt="false"
		/>

		<div
			class="g_id_signin"
			data-type="standard"
			data-shape="rectangular"
			data-theme="outline"
			data-text="signin_with"
			data-size="large"
			data-logo_alignment="left"
		/>
	</div>

	{#if type == 'login'}
		<div class="w-96 bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col gap-4 straight-shadow">
			<h3 class="text-2xl text-white">Login</h3>

			<div class="flex flex-col gap-2">
				<label class="text-white" for="username">Username</label>
				<TooltippedInput class="flex-grow" item={form.username} placeholder="" id="username" />
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-white" for="password">Password</label>
				<TooltippedInput
					class="flex-grow"
					item={form.password}
					placeholder=""
					type="password"
					id="password"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<button class="bg-primary text-white rounded-lg p-2 hover:bg-primary-hover"> Login </button>
			</div>

			<Divider />
			<button class="text-white text-left" on:click={changeModal}>Don't have an account?</button>
		</div>
	{:else}
		<div class="w-96 bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col gap-4 straight-shadow">
			<h3 class="text-2xl text-white hover:text-primary-hover">Sign up</h3>

			<div class="flex flex-col gap-2">
				<label class="text-white" for="username">Username</label>
				<TooltippedInput class="flex-grow" item={form.username} placeholder="" id="username" />
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-white" for="password">Password</label>
				<TooltippedInput
					class="flex-grow"
					item={form.password}
					placeholder=""
					type="password"
					id="password"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<button class="bg-primary text-white rounded-lg p-2 hover:bg-primary-hover">
					Sign Up
				</button>
			</div>

			<Divider />
			<button class="text-white text-left hover:text-primary-hover" on:click={changeModal}
				>Already have an account?</button
			>
		</div>
	{/if}
</div>
