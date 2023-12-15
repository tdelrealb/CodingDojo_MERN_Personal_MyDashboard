/* eslint-disable react/prop-types */
import styles from './NewNoteModal.module.css';
import 'react-quill/dist/quill.snow.css';
import NoteIcon50 from '../../assets/note-icon-white50.svg';
import FolderIconYellow from '../../assets/folder-icon-yellow.svg';
import AddNoteIcon from '../../assets/add-note-icon.svg';
import AddNoteIconYellow from '../../assets/add-note-icon-yellow.svg';

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import Modal from 'react-modal';
import axios from 'axios';

export const NewNoteModal = ({ isOpen, closeModal }) => {
	const [createMode, setCreateMode] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [area, setArea] = useState('');
	const [allNotes, setAllNotes] = useState([]);
	
	const [createArea, setCreateArea] = useState('');
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [picture, setPicture] = useState(null);
	const [editingNote, setEditingNote] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');

	const handleHover = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	// MÉTODOS AQUI
	const handleCreateNote = async (e) => {
		e.preventDefault();
		const newNote = new FormData();
		newNote.append('title', title);
		newNote.append('body', body);
		newNote.append('area', createArea);
		if(picture){
			newNote.append('image', picture);
		}
	
		const token = sessionStorage.getItem('token');
		const payload = JSON.parse(atob(token.split('.')[1]));
		const userId = payload._id; 
		
	
		newNote.append('userId', userId);
	
		try {
			const response = await axios.post(`${import.meta.env.VITE_AXIOS_URI}/notes/create`, 
			newNote,
			{
				headers:{
						Authorization: token,
						
				}
			});
			
			if(response.status === 201){
				setAllNotes([...allNotes, response.data]);
				setCreateMode(false);
				setTitle('');
				setCreateArea('');
				setBody('');
				setPicture(null);
			}
			else {
				console.log('Error creating note');
			}
			
		} catch (error) {
			console.error('Error creating', error);
		}
	};

	const handleUpdateNote = async (noteId) => {
			const token = sessionStorage.getItem('token');
			const updatedNote = new FormData();

			if(editingNote.title){
				updatedNote.append('title', editingNote.title);
			}
			if(editingNote.area){
				updatedNote.append('area', editingNote.area);
			}
			if(editingNote.body){
				updatedNote.append('body', editingNote.body);
			}
			if(editingNote.picture){
				updatedNote.append('image', editingNote.picture);
			}

		try {
			const response = await axios.put(`${import.meta.env.VITE_AXIOS_URI}/notes/update/${noteId}`, updatedNote, 
			{
				headers:{
						Authorization: token,
				}
			});
			
			if(response.status === 200){
				setAllNotes(prevNotes => ({
					...prevNotes,
					notes: prevNotes.notes.map(note => note._id === noteId ? {...response.data} : note)
				}));
				setEditingNote(null);
			}
			else {
				console.log('Error updating note');
			}
			
		} catch (error) {
			console.error('Error updating', error);
		}
	};

	const handleDeleteNote = async (noteId) => {
		const token = sessionStorage.getItem('token');
		try {
			const response = await axios.delete(`${import.meta.env.VITE_AXIOS_URI}/notes/delete/${noteId}`, {
				headers: {
					Authorization: token,
				},
			});
			if(response.status === 200){
				setAllNotes(prevNotes => ({
					...prevNotes,
					notes: prevNotes.notes.filter(note => note._id !== noteId)
				}));
			}
			else {
				console.log('Error deleting note');
			}
		} catch (error) {
			console.error('Error deleting', error);
		}
	};


	const getAllNotes = async () => {
		const token = sessionStorage.getItem('token');
		try {
			const response = await axios.get(`${import.meta.env.VITE_AXIOS_URI}/notes/all`, {
				headers: {
					Authorization: token,
				},
			});
			setAllNotes(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	const getNotesByArea = async (area) => {
		const token = sessionStorage.getItem('token');
		try {
			const response = await axios.get(`${import.meta.env.VITE_AXIOS_URI}/notes/area/${area}`, {
				headers: {
					Authorization: token,
				},
			});
			setAllNotes(response.data);
			
		} catch (error) {
			console.error(error);
		}
	};

	const searchNotes = async (query) => {
		const token = sessionStorage.getItem('token');
		try {
			const response = await axios.get(`${import.meta.env.VITE_AXIOS_URI}/notes/search/${query}`, {
				headers: {
					Authorization: token,
				},
			});
			
			return response.data;
			
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearch = async (e) => {
		setSearchQuery(e.target.value);
		const notes = await searchNotes(e.target.value);
		setAllNotes(notes);
		// console.log(notes);
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

				<input type='text' placeholder='search notes' value={searchQuery} onChange={handleSearch}  />

				<div className={styles.areaList}>
					<span className={styles.areaItem}>
						<img src={FolderIconYellow} alt='Folder-icon' />
						<p>
							All notes <span>{'(124 notes)'}</span>
						</p>
					</span>

					<span className={styles.areaItem}>
						<img src={FolderIconYellow} alt='Folder-icon' />
						<p>
							Work <span>{'(124 notes)'}</span>
						</p>
					</span>

					<span className={styles.areaItem}>
						<img src={FolderIconYellow} alt='Folder-icon' />
						<p>
							Studies <span>{'(124 notes)'}</span>
						</p>
					</span>

					<span className={styles.areaItem}>
						<img src={FolderIconYellow} alt='Folder-icon' />
						<p>
							Trip journal <span>{'(124 notes)'}</span>
						</p>
					</span>

					<span className={styles.areaItem}>
						<img src={FolderIconYellow} alt='Folder-icon' />
						<p>
							MyJournal <span>{'(124 notes)'}</span>
						</p>
					</span>
				</div>
			</section>
			<section className={styles.create}>
				{createMode ? (
					
					<input 
						className={styles.noteTitle} 
						value={title}
						type='text' 
						placeholder='Note title' 
						onChange={e => setTitle(e.target.value)}
					/>
					
				) : (
					<span
						className={styles.addNoteFloating}
						onMouseEnter={handleHover}
						onMouseLeave={handleMouseLeave}>
						<img
							src={isHovered ? AddNoteIconYellow : AddNoteIcon}
							alt='AddNote-icon'
							onClick={e => setCreateMode(true)}
						/>
					</span>
				)}
					
			</section>
		</Modal>
	);
};
