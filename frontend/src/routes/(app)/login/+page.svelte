<script lang="ts">
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client"></script>
</svelte:head>
<div class="w-full h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
	<!-- Always show button -->
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
