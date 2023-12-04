import styles from './Settings.module.css';
import backgroundBlur2 from '../../assets/backgroundBlur2.png';

export const Settings = () => {
	return (
		<div className={styles.settingsPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur2}
						alt='My Dashboard - Settings background'
					/>
				</span>
				<span className={styles.backgroundBlur}/>
			</div>
		</div>
	);
};
