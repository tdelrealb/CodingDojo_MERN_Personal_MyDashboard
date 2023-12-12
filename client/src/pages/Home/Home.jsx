import styles from './Home.module.css';
import myDashboardIcon from '../../assets/my-dashboard-icon-gradient.png';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/login');
	};

	return (
		<div className={styles.homePage}>
			<section className={styles.mainContent}>
				<span className={styles.title}>
					<img src={myDashboardIcon} alt='MyDashboard-icon' />
					<h1>MyDashboard</h1>
				</span>
				<h6 className={styles.slogan}>Your life, in order.</h6>
				<button className={styles.getStartedBtn} onClick={handleClick}>
					Get started
				</button>
			</section>
		</div>
	);
};
