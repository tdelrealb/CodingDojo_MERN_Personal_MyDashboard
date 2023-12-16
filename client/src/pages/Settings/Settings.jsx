/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from './Settings.module.css';
import MyDashGradient from '../../assets/my-dashboard-icon-gradient.png';
import Pencil from '../../assets/pencil-icon.svg';
import Upload from '../../assets/upload-circle.svg';
import Todoist from '../../assets/todoist-icon.svg';

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
	const [habits, setHabits] = useState([]);
	const [updateMode, setUpdateMode] = useState(false);
	const [userUpdate, setUserUpdate] = useState(null);

	const changeOption = option => {
		setOptionSelected(option);
		setUpdateMode(false);
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

	const getHabits = async () => {
		try {
			const token = sessionStorage.getItem('token');
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/habits/all`,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			setHabits(response.data.habits.length);
		} catch (error) {
			console.log('Error getting habits', error);
		}
	};

	const handleUpdateMode = e => {
		e.preventDefault();
		setUpdateMode(true);

		const userData = {
			userId: allUserInfo.user._id,
			firstName: allUserInfo.user.firstName,
			lastName: allUserInfo.user.lastName,
			username: allUserInfo.user.username,
		};

		setUserUpdate(userData);
	};

	const handleData = e => {
		const { name, value } = e.target;

		setUserUpdate({ ...userUpdate, [name]: value });
	};

	const handlePasswordChange = e => {
		const { value } = e.target;
		setUserUpdate({ ...userUpdate, newPassword: value });
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
		getHabits();
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
									<h4>Habits</h4>
									<div className={styles.cardInfo}>
										<p>
											We created <span>{habits}</span>{' '}
											habits
										</p>
										<p>Tracking is your thing.</p>
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

					{optionSelected === 'settings' && updateMode === false && (
						<>
							<h1 className={styles.userName}>MyProfile</h1>
							<div className={styles.userPreview}>
								<div className={styles.imageWrapper}>
									<img
										src={allUserInfo.imageUrl}
										alt='User-Pic'
									/>

									<img src='' alt='' />
								</div>

								<div className={styles.user}>
									<h6>
										{allUserInfo.user.firstName}{' '}
										{allUserInfo.user.lastName}
									</h6>
									<p>{allUserInfo.user.username}</p>
									<p>{allUserInfo.user.email}</p>
								</div>
								<button
									className={styles.edit}
									onClick={handleUpdateMode}>
									<img src={Pencil} alt='Edit-icon' />
									Edit
								</button>
							</div>
						</>
					)}

					{optionSelected === 'settings' && updateMode === true && (
						<>
							<div className={styles.update}>
								<span className={styles.userPreview}>
									<div className={styles.updateImageWrapper}>
										<img
											className={styles.profilePic}
											src={allUserInfo.imageUrl}
											alt='User-Pic'
										/>
									</div>
									<button className={styles.updateEdit}>
										Upload new photo
									</button>
								</span>

								<form className={styles.form}>
									<span className={styles.element}>
										<p>First name</p>
										<input
											type='text'
											autoComplete='off'
											name='firstName'
											value={userUpdate.firstName}
											onChange={handleData}
										/>
									</span>

									<span className={styles.element}>
										<p>Last name</p>
										<input
											type='text'
											autoComplete='off'
											name='lastName'
											value={userUpdate.lastName}
											onChange={handleData}
										/>
									</span>

									<span className={styles.element}>
										<p>Username</p>
										<input
											type='text'
											autoComplete='off'
											name='username'
											value={userUpdate.username}
											onChange={handleData}
										/>
									</span>

									<span className={styles.element}>
										<p>Password</p>
										<input
											type='password'
											autoComplete='off'
											name='password'
											placeholder='Change password'
											onChange={handleData}
										/>
									</span>

									<button className={styles.userEdit}>
										Update MyProfile
									</button>
								</form>
							</div>
						</>
					)}

					{optionSelected === 'integrations' && (
						<>
							<h1 className={styles.userName}>Integrations</h1>
							<p className={styles.userMessage}>
								We are working to deliver the best experience
								for you.
								<br />
								That's why we invite you to integrate
								MyDashboard into Todoist.
							</p>

							<button className={styles.integrateEdit}>
								<img src={Todoist} alt='Todoist-icon' />
								Integrate Todoist
							</button>
						</>
					)}
				</section>
			</div>
		</div>
	);
};
