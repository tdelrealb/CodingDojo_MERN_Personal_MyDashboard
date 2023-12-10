/* eslint-disable react/prop-types */
import styles from './NewTask.module.css';
import Modal from 'react-modal';
import MyDashboardIcon from '../../../assets/MyDashboardIcon.png';
import ArrowBtn from '../../../assets/ArrowBtn.svg';
import Error from '../../../assets/Error.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const NewTask = ({ isOpen, closeModal }) => {
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
	const [userData, setUserData] = useState(null);
	const [projects, setProjects] = useState([]);
	const [currentStep, setCurrentStep] = useState(1);
	const [errors, setErrors] = useState([]);

	const getProjectsByArea = async () => {
		try {
			const token = sessionStorage.getItem('token');

			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/projects/area/` + task.area,
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
		if (currentStep === 0) {
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
			<div className={styles.mainContent}>
				<div className={styles.column}>
					<span className={styles.header}>
						<img src={MyDashboardIcon} alt='' />
						<h2>MyDashboard</h2>
					</span>
				</div>
				<div className={styles.column}>
					{currentStep === 1 && (
						<>
							<h3>Create new task</h3>
							<h6>Select an area for your new task.</h6>
							<span className={styles.optionWrapper}>
								<div className={styles.option}>
									<button
										className={styles.option1}
										onClick={e => handleAreaBtn('Work', e)}>
										Work
									</button>
								</div>
								<div className={styles.option}>
									<button
										className={styles.option2}
										onClick={e =>
											handleAreaBtn('Studies', e)
										}>
										Studies
									</button>
								</div>
								<div className={styles.option}>
									<button
										className={styles.option3}
										onClick={e => handleAreaBtn('Trip', e)}>
										Trip
									</button>
								</div>
								<div className={styles.option}>
									<button
										className={styles.option4}
										onClick={e =>
											handleAreaBtn('Personal', e)
										}>
										Personal
									</button>
								</div>
								<div className={styles.option}>
									<button
										className={styles.option5}
										onClick={e =>
											handleAreaBtn('Social', e)
										}>
										Social
									</button>
								</div>
								<div className={styles.option}>
									<button
										className={styles.option6}
										onClick={e =>
											handleAreaBtn('Hobbies', e)
										}>
										Hobbies
									</button>
								</div>
							</span>

							<button
								className={styles.fixed}
								onClick={() =>
									setCurrentStep(prevStep => prevStep - 1)
								}>
								<img src={ArrowBtn} />
							</button>
						</>
					)}
					{currentStep === 2 && (
						<>
							<h3>Create new task</h3>
							<h6>Select a project for your new task.</h6>

							{projects.projects?.length > 0 ? (
								projects.projects.map(proj => (
									<button
										className={styles.projects}
										key={proj._id}
										onClick={e =>
											handleProyectBtn(proj._id, e)
										}>
										{proj.title}
									</button>
								))
							) : (
								<p className={styles.error}>
									<img src={Error} alt='Error' />
									There are no projects in this area. You must
									create a project before you can create a
									task.
								</p>
							)}

							<button
								className={styles.fixed}
								onClick={() =>
									setCurrentStep(prevStep => prevStep - 1)
								}>
								<img src={ArrowBtn} />
							</button>
						</>
					)}
					{currentStep === 3 && (
						<>
							<h3>Create new task</h3>
							<h6>Give your task a title</h6>
							<form className={styles.fakeInput}>
								<input
									className={styles.textInput}
									value={task.title}
									onChange={handleTitleChange}
									type='text'
									placeholder='project title'
								/>
								<button
									onClick={e => {
										e.preventDefault();
										if (task.title.trim() !== '') {
											setCurrentStep(
												prevStep => prevStep + 1,
											);
										} else {
											setErrors(['Title is required.']);
										}
									}}>
									;
									<img src={ArrowBtn} />
								</button>
							</form>
							<button
								className={styles.fixed}
								onClick={() =>
									setCurrentStep(prevStep => prevStep - 1)
								}>
								<img src={ArrowBtn} />
							</button>

							{errors.length > 0 && (
								<p className={styles.error}>
									<img src={Error} alt='Error' />
									{errors.map((error, index) => (
										<span key={index}>{error}</span>
									))}
								</p>
							)}
						</>
					)}
					{currentStep === 4 && (
						<>
							<h3>Create new task</h3>
							<h6>Give your task a date</h6>
							<form className={styles.fakeInput}>
								<DatePicker
									selected={task.date}
									onChange={handleDateChange}
									className={styles.textInput}
									dateFormat='yyyy-MM-dd'
								/>
								<button onClick={handleSubmit}>
									<img src={ArrowBtn} />
								</button>
							</form>
							<button
								className={styles.fixed}
								onClick={() =>
									setCurrentStep(prevStep => prevStep - 1)
								}>
								<img src={ArrowBtn} />
							</button>
						</>
					)}
				</div>
			</div>
		</Modal>
	);
};
