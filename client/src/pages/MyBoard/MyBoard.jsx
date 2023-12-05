import styles from './MyBoard.module.css';
import LogoutIcon from '../../assets/LogoutIcon.svg';
import { Clock } from '../../components/Clock/Clock';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MyBoard = () => {
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		navigate('/');
	};

	useEffect(() => {
		const token = sessionStorage.getItem('token');

		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
			setUserData(payload);
		}
	}, []);

	return (
		<div className={styles.myBoardPage}>
			<div className={styles.mainContainer}>
				<span className={styles.header}>
					<div className={styles.titleColumn}>
						<h1 className={styles.title}>
							Hi,{' '}
							<span className={styles.userName}>
								{userData && userData.username}
							</span>
						</h1>

						<Clock />
					</div>
					<button className={styles.logoutBtn} onClick={handleLogout}>
						Logout
						<img src={LogoutIcon} alt='LogoutIcon' />
					</button>
				</span>

				<span className={styles.mainContent}>
					<div className={styles.leftColumn}>
						<span className={styles.cardsContent}>
							<div className={styles.card}></div>
							<div className={styles.card}></div>
							<div className={styles.card}></div>
							<div className={styles.card}></div>
						</span>
						<span></span>
					</div>
					<div className={styles.rightColumn}></div>
				</span>
			</div>
		</div>
	);
};
