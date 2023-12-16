/* eslint-disable react/prop-types */
import styles from './NewProjectModal.module.css';
import NextIcon from '../../assets/next-icon.svg';
import MyDashboardWhite from '../../assets/my-dashboard-icon-white.svg';
import ErrorIcon from '../../assets/error-icon.svg';

import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Cookies from 'js-cookie';

export const NewProjectModal = ({ isOpen, closeModal }) => {
	const initialValue = {
		userId: '',
		area: '',
		title: '',
		description: '',
	};

	const [project, setProject] = useState(initialValue);
	const [currentStep, setCurrentStep] = useState(1);
	const [userData, setUserData] = useState(null);
	const [errors, setErrors] = useState([]);

	const handleAreaBtn = (areaValue, e) => {
		e.preventDefault();
		setProject(prevProject => ({ ...prevProject, area: areaValue }));
		setCurrentStep(prevStep => prevStep + 1);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			if (project.title.trim() !== '') {
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
						withCredentials: true,
						
					},
				);

				setCurrentStep(prevStep => prevStep + 1);
			} else {
				setErrors(['You need to specify a name for your project.']);
			}
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
		if (currentStep === 3) {
			closeModal();
		}
	}, [currentStep, closeModal]);

	return (
		<Modal
			isOpen={isOpen}
			contentLabel='New project'
			className={styles.customModal}
			overlayClassName={styles.customOverlay}
			onRequestClose={closeModal}>
			<img
				src={MyDashboardWhite}
				alt='MyDashboard-Icon'
				className={styles.myDashboardIcon}
			/>
			<h2>Create project</h2>
			{currentStep === 1 && (
				<>
					<h5>Select an area for your project</h5>
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
					<input
						className={styles.input}
						type='text'
						autoCapitalize='off'
						autoCorrect='off'
						spellCheck='false'
						autoFocus
						placeholder='Give a name to your project'
						value={project.title}
						onChange={e =>
							setProject(prevProject => ({
								...prevProject,
								title: e.target.value,
							}))
						}
					/>

					<input
						className={styles.inputSmall}
						type='text'
						autoCapitalize='off'
						autoCorrect='off'
						spellCheck='false'
						placeholder='Give a description to your project'
						value={project.description}
						onChange={e =>
							setProject(prevProject => ({
								...prevProject,
								description: e.target.value,
							}))
						}
					/>

					<img
						src={NextIcon}
						alt='NexIcon'
						className={styles.nextIcon}
						onClick={handleSubmit}
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
		</Modal>
	);
};
