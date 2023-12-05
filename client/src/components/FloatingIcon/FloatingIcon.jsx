import styles from './FloatingIcon.module.css';
import MyDashboardIcon from '../../assets/MyDashboardIcon.png';

export const FloatingIcon = () => {
	return (
		<div className={styles.icon}>
			<img src={MyDashboardIcon} alt='MyDashboard - Icon' />
            <h6>MyDashboard</h6>
		</div>
	);
};
