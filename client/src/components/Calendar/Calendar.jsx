/* eslint-disable react/prop-types */
import styles from './Calendar.module.css';
import LeftIcon from '../../assets/left-icon.svg';
import RightIcon from '../../assets/right-icon.svg';
import TaskPin from '../../assets/task-pin.svg';
import CheckIcon from '../../assets/check-icon.svg';
import TrashIcon from '../../assets/trash-icon.svg';
import TaskPinTransparent from '../../assets/task-pin-transparent.svg';
import CheckIconTransparent from '../../assets/check-icon-transparent.svg';
import TrashIconTransparent from '../../assets/trash-icon-transparent.svg';

import { generateDates, months } from '../../utils/CalendarFuncionalities';
import { conditionals } from '../../utils/CalendarConditionals';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

export const Calendar = ({ calendarUpdate }) => {
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectedDate, setSelectedDate] = useState(currentDate);
	const [userData, setUserData] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [completed, setCompleted] = useState(false);

	const getTasks = async () => {
		try {
			const token = sessionStorage.getItem('token');
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/tasks/all`,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			const sortedTasks = response.data.tasks.sort((a, b) => {
				if (a.status === 'Not started' && b.status !== 'Not started') {
					return -1;
				} else if (
					a.status !== 'Not started' &&
					b.status === 'Not started'
				) {
					return 1;
				}

				const dateA = new Date(a.date);
				const dateB = new Date(b.date);
				return dateA - dateB;
			});

			setTasks(sortedTasks);
		} catch (error) {
			console.log('Error getting tasks', error);
		}
	};

	const handleTaskDelete = async taskId => {
		try {
			const token = sessionStorage.getItem('token');
			await axios.delete(
				`${import.meta.env.VITE_AXIOS_URI}/tasks/delete/${taskId}`,
				{
					headers: {
						Authorization: token,
					},
					withCredentials: true,
				},
			);
			getTasks();
		} catch (error) {
			console.log('Error deleting task', error);
		}
	};

	const handleStatusChange = async task => {
		try {
			const newStatus = completed ? 'Not started' : 'Finished';
			const token = sessionStorage.getItem('token');
			await axios.put(
				`${import.meta.env.VITE_AXIOS_URI}/tasks/update/${task._id}`,
				{
					area: task.area,
					projectId: task.projectId,
					title: task.title,
					date: task.date,
					label: task.label,
					status: newStatus,
				},
				{
					headers: {
						Authorization: token,
					},
				},
			);
			getTasks();
			setCompleted(!completed);
		} catch (error) {
			console.log('Error finishing task', error);
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
		getTasks();
	}, [calendarUpdate]);

	return (
		<div className={styles.calendarToDo}>
			<section className={styles.calendar}>
				<div className={styles.calendarTitle}>
					<h2>
						{months[today.month()]} {today.year()}
					</h2>
					<span className={styles.arrows}>
						<img
							src={LeftIcon}
							alt='Left-arrow'
							onClick={() => {
								setToday(today.month(today.month() - 1));
							}}
						/>

						<h4
							onClick={() => {
								setToday(currentDate),
									setSelectedDate(currentDate);
							}}>
							Today
						</h4>

						<img
							src={RightIcon}
							alt='Right-arrow'
							onClick={() => {
								setToday(today.month(today.month() + 1));
							}}
						/>
					</span>
				</div>
				<div className={styles.days}>
					{days.map((day, index) => {
						return (
							<span key={index} className={styles.oneDay}>
								<p>{day}</p>
							</span>
						);
					})}
				</div>

				<div className={styles.dates}>
					{generateDates(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => {
							return (
								<span key={index} className={styles.oneDate}>
									<p
										className={conditionals(
											currentMonth
												? styles.dayOfCurrentMonth
												: styles.notDayOfCurrentMonth,
											today
												? styles.currentDay
												: styles.notCurrentDay,
											selectedDate
												.toDate()
												.toDateString() ===
												date.toDate().toDateString()
												? styles.selectedDate
												: styles.nonSelectedDate,
										)}
										onClick={() => {
											setSelectedDate(date), getTasks();
										}}>
										{date.date()}
									</p>
								</span>
							);
						},
					)}
				</div>
			</section>

			<section className={styles.toDoList}>
				<div className={styles.listTitle}>
					<h2>To-Do List</h2>
					<p>for {selectedDate.format('MMM, DD')}</p>
				</div>

				<div className={styles.listBody}>
					{tasks
						.filter(task =>
							dayjs(task.date).isSame(selectedDate, 'day'),
						)
						.map((task, index) => (
							<div className={styles.taskItem} key={index}>
								<div className={styles.taskInfo}>
									<img
										src={
											task.status === 'Not started'
												? TaskPin
												: TaskPinTransparent
										}
										alt='Task-pin'
									/>
									<span className={styles.taskTitleInfo}>
										<h6
											className={
												task.status === 'Not started'
													? styles.taskTitle
													: styles.taskTitleDisabled
											}>
											{task.title}
										</h6>
										<p
											className={
												task.status === 'Not started'
													? styles.projectTitle
													: styles.projectTitleDisabled
											}>
											{task.area} /{' '}
											<span
												className={
													task.status ===
													'Not started'
														? styles.statusNotStarted
														: styles.statusFinished
												}>
												{task.status}
											</span>
										</p>
									</span>
								</div>
								<span className={styles.taskActions}>
									<img
										src={
											task.status === 'Not started'
												? CheckIcon
												: CheckIconTransparent
										}
										alt='Check-icon'
										onClick={() => handleStatusChange(task)}
									/>
									<img
										src={
											task.status === 'Not started'
												? TrashIcon
												: TrashIconTransparent
										}
										alt='Trash-icon'
										onClick={() =>
											handleTaskDelete(task._id)
										}
									/>
								</span>
							</div>
						))}
				</div>
			</section>
		</div>
	);
};
