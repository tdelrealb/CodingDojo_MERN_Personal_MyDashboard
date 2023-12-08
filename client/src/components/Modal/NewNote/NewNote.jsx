/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import styles from './NewNote.module.css';
import Modal from 'react-modal';
import MyDashboardIcon from '../../../assets/MyDashboardIcon.png';
import axios from 'axios';

export const NewNote = ({ isOpen, closeModal }) => {
	const initialValue = {
		userId: '',
		area: '',
		title: '',
		body: '',
	};

	const [selectedButton, setSelectedButton] = useState(null);
	const [note, setNote] = useState(initialValue);
	const [userData, setUserData] = useState(null);
	const [errors, setErrors] = useState({});

	const handleButtonClick = buttonName => {
		setNote(prevNote => ({ ...prevNote, area: buttonName }));
		setSelectedButton(buttonName);
	};

	const handleInputChange = e => {
		const newTitle = e.target.value;
		setNote(prevNote => ({ ...prevNote, title: newTitle }));
	};

	const handleTextAreaChange = e => {
		const newBody = e.target.value;
		setNote(prevNote => ({ ...prevNote, body: newBody }));
	};

	const createAndSaveNote = () => {
		console.log('Creando y guardando la nota:', note);
		// Aquí puedes agregar la lógica para crear y guardar la nota en tu base de datos
	};

	const saveNote = async e => {
		e.preventDefault();

		try {
			const createdNote = {
				userId: userData._id,
				area: note.area,
				title: note.title,
				body: note.body,
			};

			const token = sessionStorage.getItem('token');
			await axios.post(
				`${import.meta.env.VITE_AXIOS_URI}/notes/create`,
				createdNote,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			closeModal();
		} catch (error) {
			setErrors([
				error.response.data.message || 'An unexpected error occurred.',
			]);
		}
	};

	useEffect(() => {
		if (note.title && note.area && note.body) {
			createAndSaveNote();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [note]);

	useEffect(() => {
		const token = sessionStorage.getItem('token');

		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
			setUserData(payload);
		}
	}, []);

	return (
		<Modal
			isOpen={isOpen}
			contentLabel='New note'
			className={styles.customModal}
			overlayClassName={styles.customOverlay}
			onRequestClose={closeModal}>
			<span className={styles.fakeTitle}>
				<input
					type='text'
					placeholder='Add a title to your note'
					onChange={handleInputChange}
				/>
			</span>

			<span className={styles.options}>
				<div className={styles.options1}>
					<button
						className={
							selectedButton === 'Work'
								? styles.selectedButton
								: ''
						}
						onClick={() => handleButtonClick('Work')}>
						Work
					</button>
				</div>
				<div className={styles.options2}>
					<button
						className={
							selectedButton === 'Studies'
								? styles.selectedButton
								: ''
						}
						onClick={() => handleButtonClick('Studies')}>
						Studies
					</button>
				</div>
				<div className={styles.options3}>
					<button
						className={
							selectedButton === 'Trip'
								? styles.selectedButton
								: ''
						}
						onClick={() => handleButtonClick('Trip')}>
						Trip
					</button>
				</div>
				<div className={styles.options4}>
					<button
						className={
							selectedButton === 'Personal'
								? styles.selectedButton
								: ''
						}
						onClick={() => handleButtonClick('Personal')}>
						Personal
					</button>
				</div>
			</span>

			<span className={styles.fakeBody}>
				<textarea
					type='text'
					placeholder='Add a body to your note'
					onChange={handleTextAreaChange}
				/>
			</span>
			<div className={styles.footer}>
				<span>
					<img src={MyDashboardIcon} alt='' />
					<h5>MyDashboard</h5>
				</span>

				<button className={styles.save} onClick={saveNote}>
					Save note
				</button>
			</div>

			
		</Modal>
	);
};
