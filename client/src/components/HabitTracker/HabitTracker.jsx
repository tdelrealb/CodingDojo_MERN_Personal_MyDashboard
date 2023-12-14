import styles from './HabitTracker.module.css';
import PenIcon from '../../assets/pen-icon.svg';
import TrashIcon from '../../assets/trash-icon.svg';
import LeftIcon from '../../assets/left-icon-w50.svg';
import RightIcon from '../../assets/right-icon-w50.svg';
import MyDashIcon from '../../assets/my-dashboard-icon-white.svg';
import NextIcon from '../../assets/next-icon.svg';
import MyDashGradient from '../../assets/my-dashboard-icon-gradient.png';
import ErrorIcon from '../../assets/error-icon.svg';

import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

export const HabitTracker = () => {
	const initialValue = {
		userId: '',
		title: '',
		done: false,
		doneOn: [],
	};
	const [currentWeek, setCurrentWeek] = useState(dayjs());
	const [userData, setUserData] = useState(null);
	const [habits, setHabits] = useState([]);
	const [newHabit, setNewHabit] = useState(initialValue);
	const [errors, setErrors] = useState([]);

	const goToPreviousWeek = () => {
		setCurrentWeek(currentWeek.subtract(1, 'week'));
	};

	const goToNextWeek = () => {
		setCurrentWeek(currentWeek.startOf('day').add(1, 'week'));
	};

	const goToCurrentWeek = () => {
		setCurrentWeek(dayjs());
	};

	const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
		currentWeek.startOf('week').add(i, 'day'),
	);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setNewHabit(prevExpense => ({
			...prevExpense,
			[name]: value,
		}));
	};

	const getHabits = async () => {
		try {
			const token = sessionStorage.getItem('token');
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/habits/all`,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			const sortedHabits = response.data.habits.sort(
				(a, b) =>
					dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
			);

			setHabits(sortedHabits);
		} catch (error) {
			console.log('Error getting habits', error);
		}
	};

	const handleDeleteHabit = async habitId => {
		try {
			const token = sessionStorage.getItem('token');
			await axios.delete(
				`${import.meta.env.VITE_AXIOS_URI}/habits/delete/${habitId}`,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			getHabits();
		} catch (error) {
			console.log('Error deleting habit', error);
		}
	};

	const saveHabit = async e => {
		try {
			if (newHabit.title.trim() !== '') {
				const createdHabit = {
					userId: userData._id,
					title: newHabit.title,
					done: false,
					doneOn: [],
				};

				const token = sessionStorage.getItem('token');
				await axios.post(
					`${import.meta.env.VITE_AXIOS_URI}/habits/create`,
					createdHabit,
					{
						headers: {
							Authorization: token,
						},
					},
				);
				setNewHabit(initialValue);
				getHabits();
			} else {
				setErrors(['Title cannot be empty.']);
			}
		} catch (error) {
			setErrors([
				error.response.data.message || 'An unexpected error occurred.',
			]);
		}
	};

	const handleClick = async (habit, day) => {
		try {
			let updatedDoneOn;

			const isDayCompleted = habit.doneOn.some(doneDate =>
				dayjs(doneDate).isSame(day, 'day'),
			);

			if (isDayCompleted) {
				updatedDoneOn = habit.doneOn.filter(
					doneDate => !dayjs(doneDate).isSame(day, 'day'),
				);
			} else {
				updatedDoneOn = [...habit.doneOn, day];
			}

			const updatedHabit = {
				userId: userData._id,
				title: habit.title,
				done: !habit.done,
				doneOn: updatedDoneOn,
			};

			const token = sessionStorage.getItem('token');
			await axios.put(
				`${import.meta.env.VITE_AXIOS_URI}/habits/update/${habit._id}`,
				updatedHabit,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			getHabits();
		} catch (error) {
			setErrors([
				error.response.data.message || 'An unexpected error occurred.',
			]);
		}
	};

	const getLastAddedHabit = () => {
		const lastAddedHabit = habits.length > 0 ? habits[0] : null;
		return lastAddedHabit ? lastAddedHabit.title : '';
	};

	const getMostConsistentHabit = () => {
		const mostConsistentHabit = habits.reduce(
			(acc, habit) => {
				return habit.doneOn.length > acc.doneOn.length ? habit : acc;
			},
			{ doneOn: [] },
		);

		return mostConsistentHabit.title || '';
	};

	const getTotalWeeklyHabits = () => {
		const totalExpectedHabits = habits.length * daysOfWeek.length;
		const performedHabits = habits.reduce((acc, habit) => {
			const doneOnCount = habit.doneOn.filter(doneDate =>
				dayjs(doneDate).isSame(currentWeek, 'week'),
			).length;
			return acc + doneOnCount;
		}, 0);

		return {
			totalExpected: totalExpectedHabits,
			performed: performedHabits,
		};
	};

	useEffect(() => {
		const token = sessionStorage.getItem('token');

		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
			setUserData(payload);
		}
	}, []);

	useEffect(() => {
		getHabits();
	}, []);
	return (
		<div className={styles.habitTracker}>
			<section className={styles.chartsSection}>
				<div className={styles.chart}>
					<p>Last habit added:</p>
					<h4>{getLastAddedHabit()}</h4>
				</div>
				<div className={styles.chart}>
					<p>Most consistent habit:</p>
					<h4>{getMostConsistentHabit()}</h4>
				</div>
				<div className={styles.chart}>
					<p>Weekly habits</p>
					<h1>
						<span
							className={
								getTotalWeeklyHabits().performed ===
								getTotalWeeklyHabits().totalExpected
									? styles.Completed
									: styles.noCompleted
							}>
							{getTotalWeeklyHabits().performed}
						</span>{' '}
						<span className={styles.allWhite}>/ </span>
						{getTotalWeeklyHabits().totalExpected}
					</h1>
				</div>
			</section>

			<span className={styles.moveButtons}>
				<img
					src={LeftIcon}
					alt='Left-icon'
					onClick={goToPreviousWeek}
				/>
				<p onClick={goToCurrentWeek}>Today</p>
				<img src={RightIcon} alt='Right-icon' onClick={goToNextWeek} />
			</span>

			<section className={styles.habitsSection}>
				{habits.map((habit, index) => {
					return (
						<div key={index} className={styles.habit}>
							<span className={styles.editButtons}>
								<img
									src={TrashIcon}
									alt='Trash-icon'
									onClick={() => handleDeleteHabit(habit._id)}
								/>
							</span>
							<h5>{habit.title}</h5>
							<div className={styles.buttonArea}>
								{daysOfWeek.map((day, index) => {
									const isDayCompleted = habit.doneOn.some(
										doneDate =>
											dayjs(doneDate).isSame(day, 'day'),
									);

									const isCurrentDay = day.isSame(
										dayjs(),
										'day',
									);

									return (
										<span
											key={index}
											className={styles.dates}>
											<span
												className={`${
													isDayCompleted
														? styles.completedDay
														: styles.dayOfWeek
												} ${
													isCurrentDay
														? styles.currentDay
														: styles.dayOfWeek
												}`}
												onClick={() =>
													handleClick(habit, day)
												}>
												{day.format('DD')}
											</span>
											<span>{day.format('ddd')}</span>
										</span>
									);
								})}
							</div>
							<img
								src={MyDashIcon}
								alt='MyDashboard-icon'
								className={styles.dashIcon}
							/>
						</div>
					);
				})}
			</section>

			<div className={styles.createHabit}>
				<h4>
					<span>Add new habit</span>🍀
				</h4>
				<input
					type='text'
					placeholder='Name your new habit'
					autoCapitalize='off'
					autoCorrect='off'
					spellCheck='false'
					name='title'
					value={newHabit.title}
					onChange={handleInputChange}
				/>

				{/* {errors.length > 0 && (
					<p className={styles.error}>
						<img src={ErrorIcon} alt='Error-icon' />
						{errors.map((error, index) => (
							<span key={index}>{error}</span>
						))}
					</p>
				)} */}
				<img
					src={MyDashGradient}
					alt='MyDashboard-icon'
					className={styles.dashGrad}
				/>
				<img
					src={NextIcon}
					alt='Next-icon'
					className={styles.next}
					onClick={saveHabit}
				/>
			</div>
		</div>
	);
};
