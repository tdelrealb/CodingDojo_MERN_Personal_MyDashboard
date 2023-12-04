import styles from './Social.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';

export const Social = () => {
	return (
		<div className={styles.socialPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='My Dashboard - Social background'
					/>
				</span>
				<span className={styles.backgroundBlur} />
			</div>
		</div>
	);
};
