import styles from './Hobbies.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';

export const Hobbies = () => {
	return (
		<div className={styles.hobbiesPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='My Dashboard - Hobbies background'
					/>
				</span>
				<span className={styles.backgroundBlur} />
			</div>
		</div>
	);
};
