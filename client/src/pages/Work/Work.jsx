import styles from './Work.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';

export const Work = () => {
	return (
		<div className={styles.workPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='My Dashboard - Work background'
					/>
				</span>
				<span className={styles.backgroundBlur} />
			</div>
		</div>
	);
};
