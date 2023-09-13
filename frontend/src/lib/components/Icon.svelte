<script lang="ts">
	export let icon: string;
	export let className: string = '';
</script>

<span class={`material-symbols-outlined ${className}`}>{icon}</span>
