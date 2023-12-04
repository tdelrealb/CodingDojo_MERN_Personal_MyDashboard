import styles from './Finance.module.css';
import backgroundBlur2 from '../../assets/backgroundBlur2.png';

export const Finance = () => {
	return (
		<div className={styles.financePage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur2}
						alt='My Dashboard - Finance background'
					/>
				</span>
				<span className={styles.backgroundBlur}/>
			</div>
		</div>
	);
};
