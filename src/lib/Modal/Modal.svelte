<script lang="ts">
	export let showModal = false;
	let dialog: HTMLDialogElement;

	$: {
		if (dialog) {
			showModal ? dialog.showModal() : dialog.close();
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot />
	</div>
</dialog>

<style lang="postcss">
</style>
