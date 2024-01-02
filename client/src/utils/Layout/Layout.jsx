/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styles from './Layout.module.css';
import CalendarIcon from '../../assets/calendar-icon.svg';
import AddIconAqua from '../../assets/add-icon-aqua-green.svg';
import TaskCheck from '../../assets/task-check.svg';
import TrashIcon from '../../assets/trash-icon.svg';
import CheckIcon from '../../assets/check-icon-transparent.svg';
import { Clock } from '../../components/Clock/Clock';

import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { NewProjectModal } from '../../components/NewProjectModal/NewProjectModal';
import { NewTaskModal } from '../../components/NewTaskModal/NewTaskModal';

export const Layout = ({ area, headerDescription }) => {
	const [projects, setProjects] = useState([]);
	const [activeProjectLabel, setActiveProjectLabel] = useState('');
	const [tasks, setTasks] = useState([]);
	const [selectorIsOpen, setSelectorIsOpen] = useState(false);
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

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
			console.log('Error getting projects.');
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
			const sortedTasks = response.data.tasks.sort(
				(a, b) => new Date(a.date) - new Date(b.date),
			);
			setTasks(sortedTasks);
			setActiveProjectLabel(project.title);
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

			const updatedTasks = tasks.filter(task => task._id !== taskId);
			setTasks(updatedTasks);
		} catch (error) {
			console.log('Error deleting task', error);
		}
	};

	const handleProjectDelete = async projectId => {
		try {
			const token = sessionStorage.getItem('token');
			await axios.delete(
				`${import.meta.env.VITE_AXIOS_URI}/projects/delete/${projectId}`,
				{
					headers: {
						Authorization: token,
					},
					withCredentials: true,
				},
			);
			setTasks([]);
			getProjectsByArea();
		} catch (error) {
			console.log('Error deleting project', error);
		}
	}

	const updateProjects = async () => {
		try {
			await getProjectsByArea();
		} catch (error) {
			console.log('Error updating projects.', error);
		}
	};

	const openTaskModal = () => {
		setIsTaskModalOpen(true);
	};

	const openProjectModal = () => {
		setIsProjectModalOpen(true);
	};

	const updateTasks = async () => {
		try {
			const activeProject = projects.find(
				project => project.title === activeProjectLabel,
			);
			if (activeProject) {
				await getTasksByProject(activeProject);
			}
		} catch (error) {
			console.log('Error updating tasks.', error);
		}
	};

	const closeTaskModal = async () => {
		setIsTaskModalOpen(false);
		await updateTasks();
	};

	const closeProjectModal = async () => {
		setIsProjectModalOpen(false);
		await updateProjects();
	};

	useEffect(() => {
		getProjectsByArea();
	}, []);

	return (
		<div className={styles.Layout}>
			{isTaskModalOpen && (
				<NewTaskModal
					isOpen={isTaskModalOpen}
					closeModal={closeTaskModal}
					updateTasks={updateTasks}
				/>
			)}
			{isProjectModalOpen && (
				<NewProjectModal
					isOpen={isProjectModalOpen}
					closeModal={closeProjectModal}
					updateProjects={updateProjects}
				/>
			)}

			<div className={styles.leftColumn}>
				<section className={styles.headerSection}>
					<span className={styles.dateNow}>
						<img src={CalendarIcon} alt='Calendar-icon' />
						<Clock />
					</span>

					<span className={styles.areaInfo}>
						<h1>{area}</h1>
						<h6>{headerDescription}</h6>
					</span>
				</section>

				<section className={styles.projectSection}>
					<div className={styles.projectHeader}>
						<img
							src={AddIconAqua}
							alt='Add-icon'
							className={styles.addIcon}
							onMouseEnter={() => setSelectorIsOpen(true)}
						/>

						{projects?.length > 0 ? (
							projects.map((project, index) => (
								<React.Fragment key={project._id}>
									<div
										className={
											activeProjectLabel === project.title
												? styles.activeProjectLabel
												: styles.projectLabel
										}
										onClick={() =>
											getTasksByProject(project)
										}>
										<h6>{project.title}</h6>
										{activeProjectLabel ===
											project.title && (
											<img
												src={TrashIcon}
												alt='Trash-icon'
												onClick={() => handleProjectDelete(project._id)}
											/>
										)}
									</div>
									{activeProjectLabel !== project.title ? (
										<React.Fragment>
											<span className={styles.divisor} />
										</React.Fragment>
									) : (
										<></>
									)}
								</React.Fragment>
							))
						) : (
							<div className={styles.noProjects}>
								<p>No projects in this area.</p>
							</div>
						)}
					</div>

					{projects.length > 0 && tasks.length > 0 && (
						<div className={styles.projectTasks}>
							<div className={styles.task}>
								<h6>Not started</h6>
								{tasks
									.filter(
										task => task.status === 'Not started',
									)
									.map(filteredTask => (
										<div
											className={styles.taskContainer}
											key={filteredTask._id}>
											<img
												src={TaskCheck}
												alt='Task-Check'
												onClick={() =>
													notStartedToProgress(
														filteredTask,
													)
												}
											/>

											<span className={styles.taskData}>
												<p className={styles.taskTitle}>
													{filteredTask.title}
												</p>
												<p className={styles.taskDate}>
													{dayjs(
														filteredTask.date,
													).format('MMM DD, YYYY')}
												</p>
											</span>

											<img
												className={styles.trashIcon}
												src={TrashIcon}
												alt='Trask-icon'
												onClick={() =>
													handleTaskDelete(
														filteredTask._id,
													)
												}
											/>
										</div>
									))}
							</div>

							<div className={styles.task}>
								<h6>In progress</h6>
								{tasks
									.filter(
										task => task.status === 'In progress',
									)
									.map(filteredTask => (
										<div
											className={styles.taskContainer}
											key={filteredTask._id}>
											<img
												src={TaskCheck}
												alt='Task-Check'
												onClick={() =>
													inProgressToFinished(
														filteredTask,
													)
												}
											/>

											<span className={styles.taskData}>
												<p className={styles.taskTitle}>
													{filteredTask.title}
												</p>
												<p className={styles.taskDateY}>
													{dayjs(
														filteredTask.date,
													).format('MMM DD, YYYY')}
												</p>
											</span>

											<img
												className={styles.trashIcon}
												src={TrashIcon}
												alt='Trask-icon'
												onClick={() =>
													handleTaskDelete(
														filteredTask._id,
													)
												}
											/>
										</div>
									))}
							</div>

							<div className={styles.task}>
								<h6>Finished</h6>
								{tasks
									.filter(task => task.status === 'Finished')
									.map(filteredTask => (
										<div
											className={styles.taskContainer}
											key={filteredTask._id}>
											<img
												src={CheckIcon}
												alt='Task-Check'
												onClick={() =>
													finishedToNotStarted(
														filteredTask,
													)
												}
											/>

											<span className={styles.taskData}>
												<p
													className={
														styles.taskTitleFinished
													}>
													{filteredTask.title}
												</p>
												<p
													className={
														styles.taskDateFinished
													}>
													{dayjs(
														filteredTask.date,
													).format('MMM DD, YYYY')}
												</p>
											</span>

											<img
												className={styles.trashIcon}
												src={TrashIcon}
												alt='Trask-icon'
												onClick={() =>
													handleTaskDelete(
														filteredTask._id,
													)
												}
											/>
										</div>
									))}
							</div>
						</div>
					)}

					{projects.length > 0 && tasks.length === 0 && (
						<p className={styles.noProjects}>
							No tasks in this project.
						</p>
					)}

					{selectorIsOpen === true && (
						<div
							className={styles.typeSelector}
							onMouseLeave={() => setSelectorIsOpen(false)}>
							<p onClick={() => openProjectModal()}>
								New project
							</p>
							<p onClick={() => openTaskModal()}>New task</p>
						</div>
					)}
				</section>
			</div>
			<div className={styles.rightColumn}></div>
		</div>
	);
};
