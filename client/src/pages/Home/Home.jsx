import styles from './Home.module.css';
import MyDashboardIcon from '../../assets/MyDashboardIcon.png';
import {useNavigate} from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate;

	return (
		<div className={styles.homePage}>
			<span className={styles.header}>
				<img
					src={MyDashboardIcon}
					alt='MyDashboard - Icon'
					className={styles.icon}
				/>
				<h1 className={styles.title}>MyDashboard</h1>
			</span>
            <h6 className={styles.text}>Your life, in order.</h6>
            <button className={styles.startBtn} onClick={navigate('/login')}>Get Started</button>
		</div>
	);
};
