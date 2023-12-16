/* eslint-disable react/prop-types */
import styles from './NewNoteModal.module.css';
import '../../styles/quill.snow.css';
import NoteIcon50 from '../../assets/note-icon-white50.svg';
import FolderIconYellow from '../../assets/folder-icon-yellow.svg';
import AddNoteIcon from '../../assets/add-note-icon.svg';
import AddNoteIconYellow from '../../assets/add-note-icon-yellow.svg';
import CloseIcon from '../../assets/close-icon.svg';
import MyDashWhite from '../../assets/my-dashboard-icon-white.svg';
import LittleNoteIcon from '../../assets/little-note-icon.svg';
import FolderIconWhite from '../../assets/folder-icon-white.svg';
import TrashIcon from '../../assets/trash-icon.svg';
import TrashIconRed from '../../assets/trash-icon-red.svg';

import { useState } from 'react';
import ReactQuill from 'react-quill';
import Modal from 'react-modal';
import axios, { all } from 'axios';

export const NewNoteModal = ({ isOpen, closeModal }) => {
	const initialValue = {
		userId: '',
		area: 'default',
		title: '',
		body: '',
		notePicture: '',
	};

	const [createMode, setCreateMode] = useState(1);
	const [selectedArea, setSelectedArea] = useState(createMode ? '' : 'all');
	const [isHovered, setIsHovered] = useState(false);

	const [allNotes, setAllNotes] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [createdNote, setCreatedNote] = useState(initialValue);
	const [picture, setPicture] = useState(null);

	const handleHover = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleCreateMode = () => {
		setCreateMode(1);
	};

	const handleTitleChange = e => {
		const titleValue = e.target.value;

		setCreatedNote(prevCreatedNote => ({
			...prevCreatedNote,
			title: titleValue,
		}));
	};

	const handleBodyChange = value => {
		setCreatedNote(prevCreatedNote => ({
			...prevCreatedNote,
			body: value,
		}));
	};

	const handleAreaBtn = (e, value) => {
		e.preventDefault();
		setCreatedNote(prevCreatedNote => ({
			...prevCreatedNote,
			area: value,
		}));
	};

	const getAllNotes = async () => {
		setCreateMode(0);
		setSelectedArea('all');

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
			setAllNotes(response.data.notes);
			setCreatedNote(initialValue);
		} catch (error) {
			console.log('Error loading notes', error);
		}
	};

	const searchNotes = async query => {
		setCreateMode(0);
		setSelectedArea('all');

		const token = sessionStorage.getItem('token');

		try {
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/notes/search/${query}`,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			return response.data.notes;
		} catch (error) {
			console.log('Error searching notes', error);
		}
	};

	const handleSearch = async e => {
		setCreateMode(0);
		setSearchQuery(e.target.value);
		if (e.target.value === '') {
			getAllNotes();
		} else {
			const notes = await searchNotes(e.target.value);
			setAllNotes(notes);
		}
	};

	const getNotesByArea = async (e, area) => {
		setCreateMode(0);
		setSelectedArea(area);

		const token = sessionStorage.getItem('token');
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/notes/area/${area}`,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			setAllNotes(response.data.notes);
		} catch (error) {
			console.log(`Error getting notes by ${area} area`);
		}
	};

	const saveData = async e => {
		e.preventDefault();

		const newNote = new FormData();
		newNote.append('title', createdNote.title);
		newNote.append('body', createdNote.body);
		newNote.append('area', createdNote.area);
		if (picture) {
			newNote.append('image', createdNote.notePicture);
		}

		const token = sessionStorage.getItem('token');
		const payload = JSON.parse(atob(token.split('.')[1]));
		const userId = payload._id;

		newNote.append('userId', userId);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_AXIOS_URI}/notes/create`,
				newNote,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			if (response.status === 201) {
				getAllNotes();
				setPicture(null);
				setCreatedNote(initialValue);
			}
		} catch (error) {
			console.log('Error creating note', error);
		}
	};

	const handleUpdateMode = (e, note) => {
		e.preventDefault();
		setCreateMode(2);
		setCreatedNote({
			noteId: note._id,
			userId: note.userId,
			area: note.area,
			title: note.title,
			body: note.body,
			notePicture: note.notePicture,
		});
	};

	const updateNote = async noteId => {
		const token = sessionStorage.getItem('token');
		const updatedNote = new FormData();

		if (createdNote.title) {
			updatedNote.append('title', createdNote.title);
		}
		if (createdNote.area) {
			updatedNote.append('area', createdNote.area);
		}
		if (createdNote.body) {
			updatedNote.append('body', createdNote.body);
		}
		if (createdNote.notePicture) {
			updatedNote.append('image', createdNote.notePicture);
		}

		try {
			const response = await axios.put(
				`${import.meta.env.VITE_AXIOS_URI}/notes/update/${noteId}`,
				updatedNote,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			if (response.status === 200) {
				getAllNotes();
				setCreateMode(0);
				setCreatedNote(initialValue);
			}
		} catch (error) {
			console.log('Error updating the note', error);
		}
	};

	const deleteNote = async noteId => {
		const token = sessionStorage.getItem('token');
		try {
			const response = await axios.delete(
				`${import.meta.env.VITE_AXIOS_URI}/notes/delete/${noteId}`,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			if (response.status === 200) {
				getAllNotes();
			} else {
				console.log('Error deleting the note.');
			}
		} catch (error) {
			console.log('Error deleting the note', error);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			contentLabel='New task'
			className={styles.customModal}
			overlayClassName={styles.customOverlay}
			onRequestClose={closeModal}>
			<section className={styles.menu}>
				<div className={styles.menuHeader}>
					<img src={NoteIcon50} alt='Note-icon' />
					<h2>MyNotes</h2>
					<p>{'(124 notes)'}</p>
				</div>

				<input
					type='text'
					placeholder='search notes'
					value={searchQuery}
					onChange={handleSearch}
				/>

				<div className={styles.areaList}>
					<span
						className={
							selectedArea === 'all'
								? styles.selectedArea
								: styles.areaItem
						}
						onClick={getAllNotes}>
						<img src={FolderIconYellow} alt='Folder-icon' />
						<p>All notes</p>
					</span>

					<span
						className={
							selectedArea === 'Work'
								? styles.selectedArea
								: styles.areaItem
						}
						onClick={e => getNotesByArea(e, 'Work')}>
						<img src={FolderIconYellow} alt='Folder-icon' />
						<p>Work</p>
					</span>

					<span
						className={
							selectedArea === 'Studies'
								? styles.selectedArea
								: styles.areaItem
						}
						onClick={e => getNotesByArea(e, 'Studies')}>
						<img src={FolderIconYellow} alt='Folder-icon' />
						<p>Studies</p>
					</span>

					<span
						className={
							selectedArea === 'Trip'
								? styles.selectedArea
								: styles.areaItem
						}
						onClick={e => getNotesByArea(e, 'Trip')}>
						<img src={FolderIconYellow} alt='Folder-icon' />
						<p>Trip journal</p>
					</span>

					<span
						className={
							selectedArea === 'Personal'
								? styles.selectedArea
								: styles.areaItem
						}
						onClick={e => getNotesByArea(e, 'Personal')}>
						<img src={FolderIconYellow} alt='Folder-icon' />
						<p>MyJournal</p>
					</span>
				</div>

				<img
					src={MyDashWhite}
					alt='MyDashboard-icon'
					className={styles.myDashIcon}
				/>
			</section>

			{createMode === 1 && (
				<section className={styles.create}>
					<>
						<img
							src={CloseIcon}
							alt='Close-icon'
							className={styles.closeIcon}
							onClick={getAllNotes}
						/>

						<input
							className={styles.noteTitle}
							type='text'
							autoCapitalize='off'
							autoCorrect='off'
							spellCheck='false'
							autoFocus
							placeholder='Note title'
							value={createdNote.title}
							onChange={handleTitleChange}
						/>

						<ReactQuill
							theme='snow'
							value={createdNote.body}
							onChange={handleBodyChange}
							autoCapitalize='off'
							autoCorrect='off'
							spellCheck='false'
							modules={{
								toolbar: [
									[{ header: [1, 2, 3, 4, 5, false] }],
									[
										'bold',
										'italic',
										'underline',
										'strike',
										'blockquote',
									],
									[{ list: 'ordered' }, { list: 'bullet' }],
									['link', 'image', 'video'],
								],
							}}
							formats={[
								'header',
								'bold',
								'italic',
								'underline',
								'strike',
								'blockquote',
								'list',
								'bullet',
								'link',
								'image',
								'video',
							]}
						/>

						<div className={styles.areaBtnContainer}>
							<button
								className={
									createdNote.area === 'Work'
										? styles.selectedBtn
										: styles.areaBtn
								}
								onClick={e => handleAreaBtn(e, 'Work')}>
								Work
							</button>

							<button
								className={
									createdNote.area === 'Studies'
										? styles.selectedBtn
										: styles.areaBtn
								}
								onClick={e => handleAreaBtn(e, 'Studies')}>
								Studies
							</button>

							<button
								className={
									createdNote.area === 'Trip'
										? styles.selectedBtn
										: styles.areaBtn
								}
								onClick={e => handleAreaBtn(e, 'Trip')}>
								Trip
							</button>

							<button
								className={
									createdNote.area === 'Personal'
										? styles.selectedBtn
										: styles.areaBtn
								}
								onClick={e => handleAreaBtn(e, 'Personal')}>
								Personal
							</button>
						</div>

						<button className={styles.createBtn} onClick={saveData}>
							Create note
						</button>
					</>
				</section>
			)}

			{createMode === 0 && (
				<section className={styles.noteDisplay}>
					{allNotes.map((note, index) => {
						return (
							<div className={styles.noteContainer} key={index}>
								<span
									className={styles.notePreview}
									onClick={e => handleUpdateMode(e, note)}>
									<img
										src={LittleNoteIcon}
										alt='LittleNote-icon'
									/>
									<h6>{note.title}</h6>
								</span>
								<span
									className={styles.noteInfo}
									onClick={e => getNotesByArea(e, note.area)}>
									<img
										src={FolderIconWhite}
										alt='Folder-icon'
									/>
									<p>{note.area}</p>
								</span>
							</div>
						);
					})}

					<span
						className={styles.addNoteFloating}
						onMouseEnter={handleHover}
						onMouseLeave={handleMouseLeave}
						onClick={handleCreateMode}>
						<img
							src={isHovered ? AddNoteIconYellow : AddNoteIcon}
							alt='Note-icon'
						/>
					</span>
				</section>
			)}

			{createMode === 2 && (
				<section className={styles.create}>
					<>
						<img
							src={CloseIcon}
							alt='Close-icon'
							className={styles.closeIcon}
							onClick={getAllNotes}
						/>

						<input
							className={styles.noteTitle}
							type='text'
							autoCapitalize='off'
							autoCorrect='off'
							spellCheck='false'
							autoFocus
							placeholder='Note title'
							value={createdNote.title}
							onChange={handleTitleChange}
						/>

						<ReactQuill
							theme='snow'
							value={createdNote.body}
							onChange={handleBodyChange}
							autoCapitalize='off'
							autoCorrect='off'
							spellCheck='false'
							modules={{
								toolbar: [
									[{ header: [1, 2, 3, 4, 5, false] }],
									[
										'bold',
										'italic',
										'underline',
										'strike',
										'blockquote',
									],
									[{ list: 'ordered' }, { list: 'bullet' }],
									['link', 'image', 'video'],
								],
							}}
							formats={[
								'header',
								'bold',
								'italic',
								'underline',
								'strike',
								'blockquote',
								'list',
								'bullet',
								'link',
								'image',
								'video',
							]}
						/>

						<div className={styles.areaBtnContainer}>
							<button
								className={
									createdNote.area === 'Work'
										? styles.selectedBtn
										: styles.areaBtn
								}
								onClick={e => handleAreaBtn(e, 'Work')}>
								Work
							</button>

							<button
								className={
									createdNote.area === 'Studies'
										? styles.selectedBtn
										: styles.areaBtn
								}
								onClick={e => handleAreaBtn(e, 'Studies')}>
								Studies
							</button>

							<button
								className={
									createdNote.area === 'Trip'
										? styles.selectedBtn
										: styles.areaBtn
								}
								onClick={e => handleAreaBtn(e, 'Trip')}>
								Trip
							</button>

							<button
								className={
									createdNote.area === 'Personal'
										? styles.selectedBtn
										: styles.areaBtn
								}
								onClick={e => handleAreaBtn(e, 'Personal')}>
								Personal
							</button>
						</div>

						<span
							className={styles.deleteNote}
							onMouseEnter={handleHover}
							onMouseLeave={handleMouseLeave}
							onClick={e => deleteNote(createdNote.noteId)}>
							<img
								src={isHovered ? TrashIconRed : TrashIcon}
								alt='Trash-icon'
							/>
						</span>

						<button
							className={styles.createBtn}
							onClick={e => updateNote(createdNote.noteId)}>
							Update note
						</button>
					</>
				</section>
			)}
		</Modal>
	);
};
