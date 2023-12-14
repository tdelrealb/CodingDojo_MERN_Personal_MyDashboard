//  Calendar funcionalities:

import dayjs from 'dayjs';

//  Generate the dates:
export const generateDates = (
	month = dayjs().month(),
	year = dayjs().year(),
) => {
	//  First date of the month:
	const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');

	//  Last date of the month:
	const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');

	//  Generate all dates of the month:
	const arrayOfDates = [];

	//  Generate previous dates of the month:
	for (let i = 0; i < firstDateOfMonth.day(); i++) {
		arrayOfDates.push({
			currentMonth: false,
			date: firstDateOfMonth.day(i),
		});
	}

	//  Generate current dates of the month:
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		arrayOfDates.push({
			currentMonth: true,
			date: firstDateOfMonth.date(i),
			today:
				firstDateOfMonth.date(i).toDate().toDateString() ===
				dayjs().toDate().toDateString(),
		});
	}

	//  Generate next dates of the month:
	const remaining = 42 - arrayOfDates.length;

	for (
		let i = lastDateOfMonth.date() + 1;
		i <= lastDateOfMonth.date() + remaining;
		i++
	) {
		arrayOfDates.push({
			currentMonth: false,
			date: lastDateOfMonth.date(i),
		});
	}

	return arrayOfDates;
};

export const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];