<script lang="ts">
	export let handleClick: () => void;
	export let isActive = false;
	export let isDisabled = false;
	export let isCurrent = false;
</script>

<div class="flex justify-center w-full px-1 py-1">
	<button
		on:click={handleClick}
		class="text-center text-white transition-colors duration-200 border-none cursor-default rounded-lg w-14 h-14 transition-all"
		class:isActive
		class:isDisabled
		class:isCurrent
		disabled={isDisabled}
		aria-disabled={isDisabled}
		aria-hidden={!isActive}
		tabIndex={isActive ? 0 : -1}
	>
		<slot />
	</button>
</div>

<style lang="postcss">
	.isActive {
		@apply text-white bg-orange-700 font-semibold cursor-pointer hover:bg-orange-900;
	}

	.isDisabled {
		@apply text-gray-500 pointer-events-none;
	}

	.isCurrent {
		@apply border-solid border-4 border-red-800;
	}
</style>
