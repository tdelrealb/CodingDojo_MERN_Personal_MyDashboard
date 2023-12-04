import MyDashboard_Icon from '../../assets/MyDashboard_Icon.png';
import styles from './MyDashboardIcon.module.css';

export const MyDashboardIcon = () => {
	return (
		<div className={styles.myDashIcon}>
			<img src={MyDashboard_Icon} alt='MyDashboard - Icon' />
		</div>
	);
};
