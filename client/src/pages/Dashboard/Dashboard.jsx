import styles from './Dashboard.module.css';
import backgroundBlur2 from '../../assets/backgroundBlur2.png';

export const Dashboard = () => {
	return (
		<div className={styles.dashboardPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur2}
						alt='My Dashboard - Dash background'
					/>
				</span>
				<span className={styles.backgroundBlur}/>
			</div>
		</div>
	);
};
