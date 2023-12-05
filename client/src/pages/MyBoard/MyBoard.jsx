import styles from './MyBoard.module.css';
import LogoutIcon from '../../assets/LogoutIcon.svg';
import PlusIconOrange from '../../assets/PlusIconOrange.svg';
import PlusIconBlue from '../../assets/PlusIconBlue.svg';
import PlusIconYellow from '../../assets/PlusIconYellow.svg';
import PlusIconPink from '../../assets/PlusIconPink.svg';
import { NewTask } from '../../components/Modal/NewTask/NewTask';
import { NewProject } from '../../components/Modal/NewProject/NewProject';
import { NewNote } from '../../components/Modal/NewNote/NewNote';
import { NewExpense } from '../../components/Modal/NewExpense/NewExpense';

import { Clock } from '../../components/Clock/Clock';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MyBoard = () => {
	const [userData, setUserData] = useState(null);
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
	const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
	const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		navigate('/');
	};

	const openTaskModal = () => {
		setIsTaskModalOpen(true);
	};

	const openProjectModal = () => {
		setIsProjectModalOpen(true);
	};

	const openNoteModal = () => {
		setIsNoteModalOpen(true);
	};

	const openExpenseModal = () => {
		setIsExpenseModalOpen(true);
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
							👋 Hi,{' '}
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

				<section className={styles.capture}>
					<h4>Capture</h4>
					<hr />
					<span className={styles.mainContent}>
						<div className={styles.leftColumn}>
							<span className={styles.cardsContent}>
								<div className={styles.card}>
									<h4>New task</h4>
									<button onClick={openTaskModal}>
										<img
											src={PlusIconOrange}
											alt='Orange Plus Icon'
										/>
										Create task
									</button>
								</div>

								<div className={styles.card}>
									<h4>New project</h4>
									<button onClick={openProjectModal}>
										<img
											src={PlusIconBlue}
											alt='Blue Plus Icon'
										/>
										Create project
									</button>
								</div>

								<div className={styles.card}>
									<h4>New note</h4>
									<button onClick={openNoteModal}>
										<img
											src={PlusIconYellow}
											alt='Yellow Plus Icon'
										/>
										Create note
									</button>
								</div>

								<div className={styles.card}>
									<h4>New expense</h4>
									<button onClick={openExpenseModal}>
										<img
											src={PlusIconPink}
											alt='Orange Plus Icon'
										/>
										Create expense
									</button>
								</div>
							</span>
							<span></span>
						</div>

						<div className={styles.rightColumn}>
							<div className={styles.upcoming}>
								<h3 className={styles.upcomingTitle}>
									Upcoming <br />
									tasks
								</h3>
							</div>
						</div>
					</span>
				</section>
			</div>

			{/* Modals */}
			{isTaskModalOpen && (
				<NewTask
					isOpen={isTaskModalOpen}
					closeModal={() => setIsTaskModalOpen(false)}
				/>
			)}

			{isProjectModalOpen && (
				<NewProject
					isOpen={isProjectModalOpen}
					closeModal={() => setIsProjectModalOpen(false)}
				/>
			)}

			{isNoteModalOpen && (
				<NewNote
					isOpen={isNoteModalOpen}
					closeModal={() => setIsNoteModalOpen(false)}
				/>
			)}

			{isExpenseModalOpen && (
				<NewExpense
					isOpen={isExpenseModalOpen}
					closeModal={() => setIsExpenseModalOpen(false)}
				/>
			)}
		</div>
	);
};
