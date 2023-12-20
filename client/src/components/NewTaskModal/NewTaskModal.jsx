/* eslint-disable react/prop-types */
import styles from './NewTaskModal.module.css';
import NextIcon from '../../assets/next-icon.svg';
import MyDashboardWhite from '../../assets/my-dashboard-icon-white.svg';
import ErrorIcon from '../../assets/error-icon.svg';
import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import DatePicker from 'react-datepicker';

export const NewTaskModal = ({ isOpen, closeModal }) => {
	const initialValue = {
		userId: '',
		area: 'Work',
		projectId: '',
		title: '',
		date: new Date(),
		label: '',
		status: 'Not started',
	};

	const [task, setTask] = useState(initialValue);
	const [currentStep, setCurrentStep] = useState(1);
	const [userData, setUserData] = useState(null);
	const [projects, setProjects] = useState([]);
	const [errors, setErrors] = useState([]);

	const handleAreaBtn = (areaValue, e) => {
		e.preventDefault();
		setTask(prevTask => ({ ...prevTask, area: areaValue }));
		setCurrentStep(prevStep => prevStep + 1);
	};

	const handleProyectBtn = (projectValue, e) => {
		e.preventDefault();
		setTask(prevTask => ({ ...prevTask, projectId: projectValue }));
		setCurrentStep(prevStep => prevStep + 1);
	};

	const handleTitleChange = e => {
		e.preventDefault();
		const titleValue = e.target.value;

		setTask(prevTask => ({ ...prevTask, title: titleValue }));
	};

	const handleDateChange = date => {
		setTask(prevTask => ({ ...prevTask, date }));
	};

	const handleLabelChange = e => {
		e.preventDefault();
		const labelValue = e.target.value;

		setTask(prevTask => ({ ...prevTask, label: labelValue }));
	};

	const getProjectsByArea = async () => {
		try {
			const token = sessionStorage.getItem('token');

			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/projects/area/${task.area}`,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			setProjects(response.data);
		} catch (error) {
			console.log('Error getting projects');
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
	
		try {
			const createdTask = {
				userId: userData._id,
				area: task.area,
				projectId: task.projectId,
				title: task.title,
				date: task.date,
				label: task.label,
				status: 'Not started',
			};
	
			const token = sessionStorage.getItem('token');
			await axios.post(
				`${import.meta.env.VITE_AXIOS_URI}/tasks/create`,
				createdTask,
				{
					headers: {
						Authorization: token,
					},
					withCredentials: true, // Include cookies in the request
				},
			);
	
			setCurrentStep(prevStep => prevStep + 1);
		} catch (error) {
			setErrors([
				error.response.data.message || 'An unexpected error occurred.',
			]);
		}
	};

	useEffect(() => {
		getProjectsByArea();
	}, [task.area]);

	useEffect(() => {
		const token = sessionStorage.getItem('token');

		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
			setUserData(payload);
		}
	}, []);

	useEffect(() => {
		if (currentStep === 5) {
			closeModal();
		}
	}, [currentStep, closeModal]);

	return (
		<Modal
			isOpen={isOpen}
			contentLabel='New task'
			className={styles.customModal}
			overlayClassName={styles.customOverlay}
			onRequestClose={closeModal}>
			<img
				src={MyDashboardWhite}
				alt='MyDashboard-Icon'
				className={styles.myDashboardIcon}
			/>
			<h2>Create task</h2>
			{currentStep === 1 && (
				<>
					<h5>Select an area</h5>
					<div className={styles.areas}>
						<button
							className={`${styles.areaBtn} ${styles.work}`}
							onClick={e => handleAreaBtn('Work', e)}>
							Work
						</button>
						<button
							className={`${styles.areaBtn} ${styles.studies}`}
							onClick={e => handleAreaBtn('Studies', e)}>
							Studies
						</button>
						<button
							className={`${styles.areaBtn} ${styles.trip}`}
							onClick={e => handleAreaBtn('Trip', e)}>
							Trip
						</button>
						<button
							className={`${styles.areaBtn} ${styles.personal}`}
							onClick={e => handleAreaBtn('Personal', e)}>
							Personal
						</button>
						<button
							className={`${styles.areaBtn} ${styles.social}`}
							onClick={e => handleAreaBtn('Social', e)}>
							Social
						</button>
						<button
							className={`${styles.areaBtn} ${styles.hobbies}`}
							onClick={e => handleAreaBtn('Hobbies', e)}>
							Hobbies
						</button>
					</div>
				</>
			)}

			{currentStep === 2 && (
				<>
					<h5>Select a project from {task.area}</h5>
					<div className={styles.areas}>
						{projects.projects?.length > 0 ? (
							projects.projects.map(proj => (
								<button
									className={`${styles.projectBtn} ${styles.social}`}
									key={proj._id}
									onClick={e =>
										handleProyectBtn(proj._id, e)
									}>
									{proj.title}
								</button>
							))
						) : (
							<p className={styles.error}>
								<img src={ErrorIcon} alt='Error' />
								There are no projects in this area. You must
								create a project before you can create a task.
							</p>
						)}
					</div>
				</>
			)}

			{currentStep === 3 && (
				<>
					<input
						className={styles.input}
						type='text'
						autoCapitalize='off'
						autoCorrect='off'
						spellCheck='false'
						autoFocus
						placeholder='Give a title to your task'
						value={task.title}
						onChange={handleTitleChange}
					/>

					<img
						src={NextIcon}
						alt='NexIcon'
						className={styles.nextIcon}
						onClick={e => {
							e.preventDefault();
							if (task.title.trim() !== '') {
								setCurrentStep(prevStep => prevStep + 1);
							} else {
								setErrors(['Title is required.']);
							}
						}}
					/>

					{errors.length > 0 && (
						<p className={styles.error}>
							<img src={ErrorIcon} alt='Error-icon' />
							{errors.map((error, index) => (
								<span key={index}>{error}</span>
							))}
						</p>
					)}
				</>
			)}

			{currentStep === 4 && (
				<>
					<h5 className={styles.marginBottom}>
						Pick a date for{' '}
						<span className={styles.titleGradient}>
							{task.title}
						</span>
					</h5>
					<DatePicker
						selected={task.date}
						onChange={handleDateChange}
						className={styles.input}
						dateFormat='dd-MM-yyyy'
					/>

					<input
						className={styles.inputSmall}
						type='text'
						autoCapitalize='off'
						autoCorrect='off'
						spellCheck='false'
						autoFocus
						placeholder='Give a description to your task'
						value={task.label}
						onChange={handleLabelChange}
					/>

					<img
						src={NextIcon}
						alt='NexIcon'
						className={styles.nextIcon}
						onClick={handleSubmit}
					/>
				</>
			)}
			{/* <img src={NextIcon} alt='NexIcon' className={styles.nextIcon} /> */}
		</Modal>
	);
};
