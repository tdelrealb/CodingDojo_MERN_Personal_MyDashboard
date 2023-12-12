import { useEffect, useState } from 'react';
import styles from './Clock.module.css';

export const Clock = () => {
	const [dateTime, setDateTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setDateTime(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const getMonthAbbreviation = month => {
		const monthNames = [
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
		return monthNames[month];
	};

	const formattedClock = () => {
		const month = getMonthAbbreviation(dateTime.getMonth());
		const day = dateTime.getDate();
		const year = dateTime.getFullYear();
		const hours = dateTime.getHours().toString().padStart(2, '0');
		const minutes = dateTime.getMinutes().toString().padStart(2, '0');
		const seconds = dateTime.getSeconds().toString().padStart(2, '0');

		return `${month} ${day}, ${year}`;
	};

	return (
		<div>
			<p className={styles.clock}>{formattedClock()}</p>
		</div>
	);
};
