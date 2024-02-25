<script lang="ts">
	import DatePicker from '$lib/DatePicker/DatePicker.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import { format } from 'date-fns';

	import type { ComponentEvents } from 'svelte';

	export let data;
	let showModal = false;
	let selectedDate = '';

	function handleSelect(event: ComponentEvents<DatePicker>['select']) {
		selectedDate = event.detail.dateStr;
		showModal = false;
	}
</script>

<svelte:head>
	<title>Datepicker preview</title>
	<meta name="description" content="datepicker preview" />
</svelte:head>

<section>
	<div class="w-100 flex justify-center">
		<button class="bg-gray-800 rounded-lg p-4 text-white" on:click={() => (showModal = true)}
			>Выбрать дату
		</button>
	</div>
	<div class="w-100 flex justify-center">
		{#if selectedDate}
			<p>Выбранная дата: {format(selectedDate, 'dd-MM-yyyy')}</p>
		{/if}
	</div>

	{#await data.availableDates}
		<h2 class="flex justify-center">Загрузка...</h2>
	{:then availableDates}
		<Modal bind:showModal>
			<DatePicker {availableDates} on:select={handleSelect} />
		</Modal>
	{/await}
</section>
