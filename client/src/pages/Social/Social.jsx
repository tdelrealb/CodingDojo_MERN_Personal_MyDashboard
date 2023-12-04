import styles from './Social.module.css';
import backgroundBlur2 from '../../assets/backgroundBlur2.png';

export const Social = () => {
	return (
		<div className={styles.socialPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur2}
						alt='My Dashboard - Social background'
					/>
				</span>
				<span className={styles.backgroundBlur}/>
			</div>
		</div>
	);
};
