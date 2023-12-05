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

	const dateTimeFormat = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	};

	const formattedClock = dateTime.toLocaleString('es-CL', dateTimeFormat);

	return (
		<div>
			<p className={styles.clock}>{formattedClock}</p>
		</div>
	);
};
