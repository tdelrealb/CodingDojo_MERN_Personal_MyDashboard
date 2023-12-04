import styles from './Personal.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';

export const Personal = () => {
	return (
		<div className={styles.personalPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='My Dashboard - Personal background'
					/>
				</span>
				<span className={styles.backgroundBlur} />
			</div>
		</div>
	);
};
