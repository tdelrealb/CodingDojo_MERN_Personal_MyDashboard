import styles from './Finance.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';

export const Finance = () => {
	return (
		<div className={styles.financePage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='My Dashboard - Finance background'
					/>
				</span>
				<span className={styles.backgroundBlur} />
			</div>
		</div>
	);
};
