import styles from './Hobbies.module.css';
import backgroundBlur2 from '../../assets/backgroundBlur2.png';

export const Hobbies = () => {
	return (
		<div className={styles.hobbiesPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur2}
						alt='My Dashboard - Hobbies background'
					/>
				</span>
				<span className={styles.backgroundBlur}/>
			</div>
		</div>
	);
};

