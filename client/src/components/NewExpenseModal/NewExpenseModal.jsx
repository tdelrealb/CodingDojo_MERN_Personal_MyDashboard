/* eslint-disable react/prop-types */
import styles from './NewExpenseModal.module.css';
import NextIcon from '../../assets/next-icon.svg';
import ErrorIcon from '../../assets/error-icon.svg';

import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export const NewExpenseModal = ({ isOpen, closeModal }) => {
	const initialValue = {
		userId: '',
		title: '',
		amount: '',
		category: '',
	};

	const [expense, setExpense] = useState(initialValue);
	const [currentStep, setCurrentStep] = useState(1);
	const [userData, setUserData] = useState(null);
	const [errors, setErrors] = useState([]);
	const [incomes, setIncomes] = useState([]);
	const [allExpenses, setAllExpenses] = useState([]);

	const getIncomes = async e => {
		try {
			const token = sessionStorage.getItem('token');
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/incomes/all`,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			setIncomes(response.data.incomes);
		} catch (error) {
			console.log('Error getting incomes', error);
		}
	};

	const getAllExpenses = async e => {
		try {
			const token = sessionStorage.getItem('token');
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/expenses/all`,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			setAllExpenses(response.data.expenses);
		} catch (error) {
			console.log('Error getting expenses', error);
		}
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setExpense(prevExpense => ({
			...prevExpense,
			[name]: value,
		}));
	};

	const handleSelectChange = e => {
		const { value } = e.target;
		setExpense(prevExpense => ({
			...prevExpense,
			category: value,
		}));
	};

	const saveData = async e => {
		try {
			if (expense.title.trim() !== '' && expense.amount.trim() !== '') {
				const createdExpense = {
					userId: userData._id,
					title: expense.title,
					amount: expense.amount,
					category: expense.category,
				};

				const token = sessionStorage.getItem('token');
				await axios.post(
					`${import.meta.env.VITE_AXIOS_URI}/expenses/create`,
					createdExpense,
					{
						headers: {
							Authorization: token,
						},
					},
				);

				setCurrentStep(prevStep => prevStep + 1);
			} else {
				setErrors(['Title or amount cannot be empty.']);
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
		getIncomes();
		getAllExpenses();
	}, []);

	useEffect(() => {
		if (currentStep === 2) {
			closeModal();
		}
	}, [currentStep, closeModal]);

	const totalIncomes = incomes.reduce(
		(total, income) => total + income.amount,
		0,
	);

	const totalExpenses = allExpenses.reduce(
		(total, expense) => total + expense.amount,
		0,
	);

	const remainingBalance = totalIncomes - totalExpenses;

	const totalIncomesFormatted = totalIncomes.toLocaleString();
	const totalExpensesFormatted = totalExpenses.toLocaleString();
	const remainingBalanceFormatted = remainingBalance.toLocaleString();

	return (
		<Modal
			isOpen={isOpen}
			contentLabel='New task'
			className={styles.customModal}
			overlayClassName={styles.customOverlay}
			onRequestClose={closeModal}>
			<div className={styles.column}>
				<p className={styles.paragraph}>
					Your total income is: <br />{' '}
					<span className={styles.green}>
						${totalIncomesFormatted}
					</span>
				</p>
				<p className={styles.paragraph}>
					You have spent: <br />{' '}
					<span className={styles.yellow}>
						${totalExpensesFormatted}
					</span>
				</p>
				<p className={styles.paragraph}>
					Cash on hand: <br />{' '}
					<span
						className={
							remainingBalance > 0 ? styles.green : styles.red
						}>
						${remainingBalanceFormatted}
					</span>
				</p>
			</div>
			<span className={styles.verLine}></span>

			<div className={styles.rightColumn}>
				<h2>New expense</h2>
				<input
					type='text'
					placeholder='Title of the expense'
					autoFocus
					autoCapitalize='off'
					autoCorrect='off'
					spellCheck='false'
					name='title'
					value={expense.title}
					onChange={handleInputChange}
				/>
				<input
					type='number'
					placeholder='amount'
					autoCapitalize='off'
					autoCorrect='off'
					spellCheck='false'
					name='amount'
					value={expense.amount}
					onChange={handleInputChange}
				/>
				<select name='category' onChange={handleSelectChange}>
					<option value='' disabled>
						Type of expense
					</option>
					<option value='Bills'>Bills</option>
					<option value='Expenses'>Expenses</option>
					<option value='Savings'>Savings</option>
					<option value='Investments'>Investments</option>
					<option value='Debts'>Debts</option>
				</select>
			</div>
			<img
				src={NextIcon}
				alt='NextIcon'
				className={styles.nextIcon}
				onClick={saveData}
			/>

			{errors.length > 0 && (
				<p className={styles.error}>
					<img src={ErrorIcon} alt='Error-icon' />
					{errors.map((error, index) => (
						<span key={index}>{error}</span>
					))}
				</p>
			)}
		</Modal>
	);
};
