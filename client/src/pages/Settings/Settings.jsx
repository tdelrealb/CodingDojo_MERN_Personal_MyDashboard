import styles from './Settings.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';

export const Settings = () => {
	return (
		<div className={styles.settingsPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='My Dashboard - Settings background'
					/>
				</span>
				<span className={styles.backgroundBlur} />
			</div>
		</div>
	);
};
