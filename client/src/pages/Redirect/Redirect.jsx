import styles from './Redirect.module.css';
import MyDashboardIcon from '../../assets/MyDashboardIcon.png';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

export const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTimeOut = setTimeout(() => {
            navigate('/myboard');
        }, 4000);

        return () => clearTimeout(redirectTimeOut)
    }, [navigate])

	return (
		<div className={styles.redirectPage}>
			<span className={styles.header}>
				<img
					src={MyDashboardIcon}
					alt='MyDashboard - Icon'
					className={styles.icon}
				/>
				<h1 className={styles.title}>Welcome to MyDashboard</h1>
			</span>
            <h6 className={styles.text}>We are putting everything in place.</h6>
		</div>
	);
};
