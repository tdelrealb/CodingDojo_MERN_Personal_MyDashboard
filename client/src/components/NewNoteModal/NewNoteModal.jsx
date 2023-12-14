/* eslint-disable react/prop-types */
import styles from './NewNoteModal.module.css';
import 'react-quill/dist/quill.snow.css';

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import Modal from 'react-modal';
import axios from 'axios';

export const NewNoteModal = ({ isOpen, closeModal }) => {
	const [text, setText] = useState('');

	return (
		<Modal
			isOpen={isOpen}
			contentLabel='New task'
			className={styles.customModal}
			overlayClassName={styles.customOverlay}
			onRequestClose={closeModal}>
			
		</Modal>
	);
};
