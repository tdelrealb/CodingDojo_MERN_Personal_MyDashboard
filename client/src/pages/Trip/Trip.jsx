import styles from './Trip.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';

export const Trip = () => {
	return (
		<div className={styles.tripPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='My Dashboard - Trip background'
					/>
				</span>
				<span className={styles.backgroundBlur} />
			</div>
		</div>
	);
};
