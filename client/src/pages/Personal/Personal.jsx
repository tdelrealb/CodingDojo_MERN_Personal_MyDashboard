import styles from './Personal.module.css';
import backgroundBlur2 from '../../assets/backgroundBlur2.png';

export const Personal = () => {
	return (
		<div className={styles.personalPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur2}
						alt='My Dashboard - Personal background'
					/>
				</span>
				<span className={styles.backgroundBlur}/>
			</div>
		</div>
	);
};
