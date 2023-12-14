/* eslint-disable react/prop-types */
import styles from './NewNoteModal.module.css';

import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export const NewNoteModal = ({ isOpen, closeModal }) => {
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
