import styles from './Redirect.module.css';
import myDashboardIcon from '../../assets/my-dashboard-icon-gradient.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Redirect = () => {
	const navigate = useNavigate();
    const [progressBar, setProgressBar] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressBar(prevProgressBar => {
                const increment = (100 / (4000 / 40)); 
                const newProgress = Math.min(prevProgressBar + increment, 100);

                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => navigate('/myboard'), 1500);
                }

                return newProgress;
            });
        }, 40);


        return () => clearInterval(interval);
    }, [navigate]);

	return (
		<div className={styles.redirectPage}>
            <div className={styles.progressBar}>
				<div
					className={styles.progressBarFill}
					style={{ width: `${progressBar}%` }}
				/>
			</div>

			<span className={styles.title}>
				<img src={myDashboardIcon} alt='MyDashboard-icon' />
				<h1 className={styles.titleText}>
					Welcome to <span>YourDashboard</span>
				</h1>
			</span>
			<p>We are putting everything in place.</p>
		</div>
	);
};
