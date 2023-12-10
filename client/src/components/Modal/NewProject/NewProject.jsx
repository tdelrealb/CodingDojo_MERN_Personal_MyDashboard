/* eslint-disable react/prop-types */
import styles from './NewProject.module.css';
import Modal from 'react-modal';
import MyDashboardIcon from '../../../assets/MyDashboardIcon.png';
import ArrowBtn from '../../../assets/ArrowBtn.svg';
import Error from '../../../assets/Error.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const NewProject = ({ isOpen, closeModal }) => {
	const initialValue = {
		userId: '',
		area: '',
		title: '',
		description: '',
	};

	const [project, setProject] = useState(initialValue);
	const [userData, setUserData] = useState(null);
	const [currentStep, setCurrentStep] = useState(1);
	const [errors, setErrors] = useState([]);

	const handleAreaBtn = (areaValue, e) => {
		e.preventDefault();
		setProject(prevProject => ({ ...prevProject, area: areaValue }));
		setCurrentStep(prevStep => prevStep + 1);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const createdProject = {
				userId: userData._id,
				area: project.area,
				title: project.title,
				description: project.description,
			};

			const token = sessionStorage.getItem('token');
			await axios.post(
				`${import.meta.env.VITE_AXIOS_URI}/projects/create`,
				createdProject,
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
		const token = sessionStorage.getItem('token');

		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
			setUserData(payload);
		}
	}, []);

	useEffect(() => {
		if (currentStep === 0 || currentStep === 4) {
			closeModal();
		}
	}, [currentStep, closeModal]);

	return (
		<div>
			<Modal
				isOpen={isOpen}
				contentLabel='New project'
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
								<h3>Create new project</h3>
								<h6>Give your project a title</h6>
								<form className={styles.fakeInput}>
									<input
										className={styles.textInput}
										value={project.title}
										onChange={e =>
											setProject(prevProject => ({
												...prevProject,
												title: e.target.value,
											}))
										}
										type='text'
										placeholder='project title'
									/>
									<button
										onClick={e => {
											e.preventDefault();
											if (project.title.trim() !== '') {
												setCurrentStep(
													prevStep => prevStep + 1,
												);
											} else {
												setErrors([
													'Title is required.',
												]);
											}
										}}>
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
						{currentStep === 2 && (
							<>
								<h3>Create new project</h3>
								<h6>Select an area for your new project.</h6>
								<span className={styles.optionWrapper}>
									<div className={styles.option}>
										<button
											className={styles.option1}
											onClick={e =>
												handleAreaBtn('Work', e)
											}>
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
											onClick={e =>
												handleAreaBtn('Trip', e)
											}>
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
						{currentStep === 3 && (
							<>
								<h3>Create new project</h3>
								<h6>Give your project a description</h6>
								<form className={styles.fakeInput}>
									<input
										className={styles.textInput}
										value={project.description}
										onChange={e =>
											setProject(prevProject => ({
												...prevProject,
												description: e.target.value,
											}))
										}
										type='text'
										placeholder='project description'
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
					</div>
				</div>
			</Modal>
		</div>
	);
};
