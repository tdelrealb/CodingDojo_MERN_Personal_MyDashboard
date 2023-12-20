/* eslint-disable react/prop-types */
import styles from './Layout.module.css';
import CalendarIcon from '../../assets/calendar-icon.svg';
import AddIconW50 from '../../assets/add-icon-white5.svg';
import TaskPinW75 from '../../assets/check-icon.svg';
import NextIconYellow from '../../assets/next-icon-yellow.svg';
import CloseIconRed from '../../assets/close-icon-red.svg';

import { Clock } from '../../components/Clock/Clock';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

export const Layout = ({ area, headerDescription }) => {
	const [projects, setProjects] = useState([]);
	const [activeLabel, setActiveLabel] = useState('');
	const [tasks, setTasks] = useState([]);

	const getProjectsByArea = async () => {
		try {
			const token = sessionStorage.getItem('token');

			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/projects/area/${area}`,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			const sortedProjects = response.data.projects.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
			);

			setProjects(sortedProjects);

			if (response.data.projects.length > 0) {
				getTasksByProject(sortedProjects[0]);
			}
		} catch (error) {
			console.log('Error getting projects');
		}
	};

	const getTasksByProject = async project => {
		try {
			const token = sessionStorage.getItem('token');

			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/tasks/project/${
					project._id
				}`,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			setTasks(response.data.tasks);
			setActiveLabel(project.title);
		} catch (error) {
			console.log('Error getting tasks');
		}
	};

	const notStartedToProgress = async task => {
		try {
			const token = sessionStorage.getItem('token');
			await axios.put(
				`${import.meta.env.VITE_AXIOS_URI}/tasks/update/${task._id}`,
				{
					area: task.area,
					projectId: task.projectId,
					title: task.title,
					date: task.date,
					label: task.label,
					status: 'In progress',
				},
				{
					headers: {
						Authorization: token,
					},
				},
			);
			const updatedTasks = tasks.map(t =>
				t._id === task._id ? { ...t, status: 'In progress' } : t,
			);
			setTasks(updatedTasks);
		} catch (error) {
			console.log('Error updating the task.');
		}
	};

	const inProgressToFinished = async task => {
		try {
			const token = sessionStorage.getItem('token');
			await axios.put(
				`${import.meta.env.VITE_AXIOS_URI}/tasks/update/${task._id}`,
				{
					area: task.area,
					projectId: task.projectId,
					title: task.title,
					date: task.date,
					label: task.label,
					status: 'Finished',
				},
				{
					headers: {
						Authorization: token,
					},
				},
			);
			const updatedTasks = tasks.map(t =>
				t._id === task._id ? { ...t, status: 'Finished' } : t,
			);
			setTasks(updatedTasks);
		} catch (error) {
			console.log('Error updating the task.');
		}
	};

	const finishedToNotStarted = async task => {
		try {
			const token = sessionStorage.getItem('token');
			await axios.put(
				`${import.meta.env.VITE_AXIOS_URI}/tasks/update/${task._id}`,
				{
					area: task.area,
					projectId: task.projectId,
					title: task.title,
					date: task.date,
					label: task.label,
					status: 'Not started',
				},
				{
					headers: {
						Authorization: token,
					},
				},
			);
			const updatedTasks = tasks.map(t =>
				t._id === task._id ? { ...t, status: 'Not started' } : t,
			);
			setTasks(updatedTasks);
		} catch (error) {
			console.log('Error updating the task.');
		}
	};

	useEffect(() => {
		getProjectsByArea();
	}, []);

	return (
		<div className={styles.Layout}>
			<div className={styles.leftColumn}>
				<section className={styles.header}>
					<span className={styles.dateNow}>
						<img src={CalendarIcon} alt='Calendar-Icon' />
						<Clock className={styles.clock} />
					</span>

					<span className={styles.areaInfo}>
						<h1>{area}</h1>
						<p>{headerDescription}</p>
					</span>
				</section>

				<section className={styles.projectSection}>
					<div className={styles.projectLabel}>
						<img
							src={AddIconW50}
							alt='Add-icon'
							className={styles.addIcon}
						/>
						<span className={styles.divisor} />
						{projects?.length > 0 ? (
							projects.map((project, index) => (
								<>
									<div
										key={project._id}
										className={
											activeLabel === project.title
												? styles.activeLabel
												: styles.label
										}
										onClick={() =>
											getTasksByProject(project)
										}>
										<p>{project.title}</p>
									</div>
									<span className={styles.divisor} />
								</>
							))
						) : (
							<div className={styles.noProjects}>
								<p>No projects in this area.</p>
								<p className={styles.createOne}>
									Let{"'"}s create one.
								</p>
							</div>
						)}
					</div>
					{projects.length > 0 ? (
						<div className={styles.statusContainer}>
							<div className={styles.status}>
								<h5 className={styles.statusNotStarted}>
									Not started
								</h5>

								<div className={styles.tasksContainer}>
									{tasks
										.filter(
											task =>
												task.status === 'Not started',
										)
										.map(filteredTask => (
											<div
												key={filteredTask._id}
												className={styles.task}>
												<img
													src={NextIconYellow}
													alt='TaskPin-icon'
													onClick={() =>
														notStartedToProgress(
															filteredTask,
														)
													}
												/>
												<span
													className={styles.taskData}>
													<p
														className={
															styles.taskTitle
														}>
														{filteredTask.title}
													</p>
													<p>
														{dayjs(
															filteredTask.date,
														).format(
															'MMM DD, YYYY',
														)}{' '}
														/{' '}
														<span
															className={
																styles.statusNotStarted
															}>
															{
																filteredTask.status
															}
														</span>
													</p>
												</span>
											</div>
										))}
								</div>
							</div>

							<div className={styles.status}>
								<h5 className={styles.statusInProgress}>
									In progress
								</h5>

								<div className={styles.tasksContainer}>
									{tasks
										.filter(
											task =>
												task.status === 'In progress',
										)
										.map(filteredTask => (
											<div
												key={filteredTask._id}
												className={styles.task}>
												<img
													src={TaskPinW75}
													alt='TaskPin-icon'
													onClick={() =>
														inProgressToFinished(
															filteredTask,
														)
													}
												/>
												<span
													className={styles.taskData}>
													<p
														className={
															styles.taskTitle
														}>
														{filteredTask.title}
													</p>
													<p>
														{dayjs(
															filteredTask.date,
														).format(
															'MMM DD, YYYY',
														)}{' '}
														/{' '}
														<span
															className={
																styles.statusInProgress
															}>
															{
																filteredTask.status
															}
														</span>
													</p>
												</span>
											</div>
										))}
								</div>
							</div>

							<div className={styles.status}>
								<h5 className={styles.statusFinished}>
									Finished
								</h5>

								<div className={styles.tasksContainer}>
									{tasks
										.filter(
											task => task.status === 'Finished',
										)
										.map(filteredTask => (
											<div
												key={filteredTask._id}
												className={styles.task}>
												<img
													src={CloseIconRed}
													alt='TaskPin-icon'
													onClick={() =>
														finishedToNotStarted(
															filteredTask,
														)
													}
												/>
												<span
													className={styles.taskData}>
													<p
														className={
															styles.taskTitle
														}>
														{filteredTask.title}
													</p>
													<p>
														{dayjs(
															filteredTask.date,
														).format(
															'MMM DD, YYYY',
														)}{' '}
														/{' '}
														<span
															className={
																styles.statusFinished
															}>
															{
																filteredTask.status
															}
														</span>
													</p>
												</span>
											</div>
										))}
								</div>
							</div>
						</div>
					) : (
						<></>
					)}
				</section>
			</div>
		</div>
	);
};

