import styles from './Settings.module.css';
import MyDashGradient from '../../assets/my-dashboard-icon-gradient.png';

import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import moment from 'moment';
import 'moment/locale/es';

export const Settings = () => {
	const [optionSelected, setOptionSelected] = useState('overview');
	const [userData, setUserData] = useState(null);
	const [allUserInfo, setAllUserInfo] = useState([]);
	const [tasks, setTasks] = useState('');
	const [finishedTasksCount, setFinishedTasksCount] = useState(0);
	const [notes, setNotes] = useState([]);

	const changeOption = option => {
		setOptionSelected(option);
	};

	const getUser = async () => {
		const userId = userData._id;
		const token = sessionStorage.getItem('token');
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/users/${userId}`,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			setAllUserInfo(response.data);
		} catch (error) {
			console.log('Error loading user info.', error);
		}
	};

	const getTasks = async () => {
		try {
			const token = sessionStorage.getItem('token');
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/tasks/all`,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			setTasks(response.data.tasks);
			const finishedTasks = response.data.tasks.filter(
				task => task.status === 'Finished',
			);
			setFinishedTasksCount(finishedTasks.length);
		} catch (error) {
			console.log('Error getting tasks', error);
		}
	};

	const getAllNotes = async () => {
		const token = sessionStorage.getItem('token');
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/notes/all`,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			setNotes(response.data.notes.length);
		} catch (error) {
			console.log('Error loading notes', error);
		}
	};

	useEffect(() => {
		const token = sessionStorage.getItem('token');

		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
			setUserData(payload);
		}
	}, []);

	useEffect(() => {
		getUser();
		getTasks();
		getAllNotes();
	}, [userData]);

	const tasksNum = tasks.length;

	return (
		<div className={styles.settingsPage}>
			<div className={styles.centerContainer}>
				<section className={styles.menu}>
					<img
						src={MyDashGradient}
						alt='MyDashboard-icon'
						className={styles.myDashIcon}
					/>

					<span
						className={
							optionSelected === 'overview'
								? styles.menuOptSelected
								: styles.menuOpt
						}
						onClick={e => changeOption('overview')}>
						<p>Overview</p>
					</span>

					<span
						className={
							optionSelected === 'settings'
								? styles.menuOptSelected
								: styles.menuOpt
						}
						onClick={e => changeOption('settings')}>
						<p>User settings</p>
					</span>

					<span
						className={
							optionSelected === 'integrations'
								? styles.menuOptSelected
								: styles.menuOpt
						}
						onClick={e => changeOption('integrations')}>
						<p>Integrations</p>
					</span>

					<span
						className={
							optionSelected === 'delete'
								? styles.menuOptSelected
								: styles.menuOpt
						}
						onClick={e => changeOption('delete')}>
						<p>Delete account</p>
					</span>
				</section>

				<section className={styles.optionContainer}>
					{optionSelected === 'overview' && (
						<>
							<h1 className={styles.userName}>
								{userData && userData.firstName},
							</h1>
							<p className={styles.userMessage}>
								We have been together since{' '}
								{allUserInfo.user && allUserInfo.user.createdAt
									? moment(allUserInfo.user.createdAt)
											.locale('es')
											.format('D [of] MMM, YYYY')
									: 'unknown date'}{' '}
								and here is the work we have done together.
							</p>

							<div className={styles.userNumbers}>
								<span className={styles.dataCard}>
									<h4>Tasks</h4>
									<div className={styles.cardInfo}>
										<p>
											We created <span>{tasksNum}</span>{' '}
											tasks
										</p>
										<p>
											You have completed{' '}
											<span>{finishedTasksCount}</span>
										</p>
									</div>
								</span>
								<span className={styles.dataCard}>
									<h4>Projects</h4>
									<div className={styles.cardInfo}>
										<p>
											We created <span>2</span> projects
										</p>
										<p>Planning is your thing.</p>
									</div>
								</span>
								<span className={styles.dataCard}>
									<h4>Notes</h4>
									<div className={styles.cardInfo}>
										<p>
											We've written <span>{notes}</span>{' '}
											notes
										</p>
										<p>Quite a writer.</p>
									</div>
								</span>
							</div>
						</>
					)}

					{optionSelected === 'settings' && (
						<>
							<h1>user settings</h1>
						</>
					)}

					{optionSelected === 'integrations' && (
						<>
							<h1>integrations</h1>
						</>
					)}

					{optionSelected === 'delete' && (
						<>
							<h1>delete</h1>
						</>
					)}
				</section>
			</div>
		</div>
	);
};
