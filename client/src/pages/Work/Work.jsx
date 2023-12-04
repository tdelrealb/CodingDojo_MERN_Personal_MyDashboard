import styles from './Work.module.css';
import backgroundBlur2 from '../../assets/backgroundBlur2.png';

export const Work = () => {
	return (
		<div className={styles.workPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur2}
						alt='My Dashboard - Work background'
					/>
				</span>
				<span className={styles.backgroundBlur}/>
			</div>
		</div>
	);
};
