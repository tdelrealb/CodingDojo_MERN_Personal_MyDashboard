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

	const handleHover = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	// MÉTODOS AQUI

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

				<input type='text' placeholder='search notes' />

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
					<input className={styles.noteTitle} type='text' placeholder='Note title'/>
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
