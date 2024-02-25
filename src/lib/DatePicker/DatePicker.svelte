<script lang="ts">
	import { differenceInCalendarDays, format, isBefore, isSameDay, isToday } from 'date-fns';
	import { createEventDispatcher, onMount } from 'svelte';

	import DatePickerView from './DatePickerView.svelte';
	import DatePickerItem from './DatePickerItem.svelte';
	import { getDateObject, getRows, initRows, padNumber } from './utils';

	export let availableDates: string[];

	const dispatch = createEventDispatcher();

	let selectedFullDateStr = format(new Date(), 'dd-MM-yyyy');
	let selectedMonth = +format(new Date(), 'MM');
	let selectedYear = +format(new Date(), 'yyyy');
	let rows = initRows();

	function nextMonthClickHandler() {
		selectedMonth++;

		if (selectedMonth > 12) {
			selectedMonth = 1;
			selectedYear++;
		}

		rows = getRows(selectedMonth, selectedYear);
	}
	function prevMonthClickHandler() {
		selectedMonth--;

		if (selectedMonth <= 0) {
			selectedMonth = 12;
			selectedYear--;
		}
		rows = getRows(selectedMonth, selectedYear);
	}

	function selectDate(year: number, month: number, date: number) {
		const dateStr = padNumber(date);
		const monthStr = padNumber(month);

		selectedFullDateStr = format(new Date(`${year}-${monthStr}-${dateStr}T12:00:00`), 'yyyy-MM-dd');
		dispatch('select', {
			dateStr: selectedFullDateStr
		});
	}

	function checkIfAvailable(date: number) {
		return availableDates.some((availableDate) =>
			isSameDay(availableDate, getDateObject(date, selectedMonth, selectedYear))
		);
	}

	function checkIfCurrent(date: number) {
		return isToday(getDateObject(date, selectedMonth, selectedYear));
	}

	function checkIfBeforeToday(date: number) {
		return (
			differenceInCalendarDays(getDateObject(date, selectedMonth, selectedYear), new Date()) < 0
		);
	}

	onMount(() => {
		rows = getRows(selectedMonth, selectedYear);
	});
</script>

<DatePickerView
	let:date
	onPrevMonthClick={prevMonthClickHandler}
	onNextMonthClick={nextMonthClickHandler}
	{selectedMonth}
	{selectedYear}
	{rows}
>
	{@const isBeforeToday = checkIfBeforeToday(date)}
	{@const isAvailable = checkIfAvailable(date) && !isBeforeToday}
	<DatePickerItem
		handleClick={() => {
			if (isAvailable) {
				selectDate(selectedYear, selectedMonth, date);
			}
		}}
		isActive={isAvailable}
		isCurrent={checkIfCurrent(date)}
		isDisabled={checkIfBeforeToday(date)}
	>
		{date}
	</DatePickerItem>
</DatePickerView>
