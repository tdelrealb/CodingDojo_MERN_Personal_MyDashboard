import styles from './Studies.module.css';
import backgroundBlur2 from '../../assets/backgroundBlur2.png';

export const Studies = () => {
	return (
		<div className={styles.studiesPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur2}
						alt='My Dashboard - Studies background'
					/>
				</span>
				<span className={styles.backgroundBlur}/>
			</div>
		</div>
	);
};
