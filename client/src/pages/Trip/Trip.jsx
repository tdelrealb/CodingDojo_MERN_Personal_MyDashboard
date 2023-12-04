import styles from './Trip.module.css';
import backgroundBlur2 from '../../assets/backgroundBlur2.png';

export const Trip = () => {
	return (
		<div className={styles.tripPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur2}
						alt='My Dashboard - Trip background'
					/>
				</span>
				<span className={styles.backgroundBlur}/>
			</div>
		</div>
	);
};
