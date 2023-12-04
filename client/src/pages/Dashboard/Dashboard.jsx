import styles from './Dashboard.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';

export const Dashboard = () => {
	return (
		<div className={styles.dashboardPage}>
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='My Dashboard - Dash background'
					/>
				</span>
				<span className={styles.backgroundBlur}/>
			</div>
		</div>
	);
};
