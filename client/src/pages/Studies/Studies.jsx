import styles from './Studies.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';

export const Studies = () => {
	return (
		<div className={styles.studiesPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='My Dashboard - Studies background'
					/>
				</span>
				<span className={styles.backgroundBlur} />
			</div>
		</div>
	);
};
