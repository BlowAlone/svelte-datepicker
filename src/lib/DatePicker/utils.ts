import { format, startOfMonth, endOfMonth } from 'date-fns';

export const padNumber = (num: number) => num.toString().padStart(2, '0');
export const initRows = () => {
	return [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0]
	];
};

export const DAYS_OF_THE_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const getDateObject = (date: number, month: number, year: number) =>
	new Date(`${year}-${padNumber(month)}-${padNumber(date)}`);

export const getFormattedMonthWithYear = (month: number, year: number) => {
	const date = format(new Date(`${year}-${padNumber(month)}-01T12:00:00`), 'MMMM yyyy');
	return date.charAt(0).toUpperCase() + date.slice(1);
};

export const getRows = (month: number, year: number) => {
	const rows = initRows();
	const monthStr = padNumber(month);

	const firstDayOfCurrentMonth = format(
		startOfMonth(new Date(`${year}-${monthStr}-01T12:00:00`)),
		'EEEEEE'
	);

	const lastDayOfCurrentMonth = +format(
		endOfMonth(new Date(`${year}-${monthStr}-01T12:00:00`)),
		'd'
	);

	let row = 0;
	let col = 0;
	let start = false;
	let i = 0;

	for (row = 0; row <= 5; row++) {
		DAYS_OF_THE_WEEK.forEach((dayName) => {
			if (i > lastDayOfCurrentMonth) {
				return;
			}

			if (!start && dayName === firstDayOfCurrentMonth) {
				i++;
				start = true;
			}

			rows[row][col] = i;
			col++;

			if (start) {
				i++;
			}
		});

		col = 0;
	}

	return rows;
};
