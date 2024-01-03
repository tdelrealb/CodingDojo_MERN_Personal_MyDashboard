/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styles from './Layout.module.css';
import CalendarIcon from '../../assets/calendar-icon.svg';
import AddIconAqua from '../../assets/add-icon-aqua-green.svg';
import TaskCheck from '../../assets/task-check.svg';
import TrashIcon from '../../assets/trash-icon.svg';
import CheckIcon from '../../assets/check-icon-transparent.svg';
import { Clock } from '../../components/Clock/Clock';
import InstagramIcon from '../../assets/instagram-icon.svg';
import FacebookIcon from '../../assets/facebook-icon.svg';
import TwitterIcon from '../../assets/twitter-icon.svg';
import WhatsappIcon from '../../assets/whatsapp-icon.svg';
import TodoistGradient from '../../assets/todoist-icon-gradient.svg';
import LittleNoteIcon from '../../assets/little-note-icon.svg';
import CloseIcon from '../../assets/close-icon.svg';

import axios, { all } from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { NewProjectModal } from '../../components/NewProjectModal/NewProjectModal';
import { NewTaskModal } from '../../components/NewTaskModal/NewTaskModal';
import { NewNoteModal } from '../../components/NewNoteModal/NewNoteModal';
import { Link } from 'react-router-dom';

export const Layout = ({ area, headerDescription }) => {
	const initialValue = {
		userId: '',
		title: '',
		description: '',
		link: '',
	};

	const [projects, setProjects] = useState([]);
	const [activeProjectLabel, setActiveProjectLabel] = useState('');
	const [tasks, setTasks] = useState([]);
	const [selectorIsOpen, setSelectorIsOpen] = useState(false);
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
	const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState(null);
	const [userData, setUserData] = useState(null);
	const [allNotes, setAllNotes] = useState([]);
	const [selectedNoteEditable, setSelectedNoteEditable] = useState(null);
	const [resourcesCreateMode, setResourcesCreateMode] = useState(false);
	const [newResource, setNewResource] = useState(initialValue);
	const [resources, setResources] = useState([]);

	const openNoteModal = () => {
		setSelectedNoteEditable(null);
		setIsNoteModalOpen(true);
	};

	const openEditNoteModal = note => {
		setSelectedNoteEditable(note);
		setIsNoteModalOpen(true);
	};

	const closeNoteModal = async () => {
		setIsNoteModalOpen(false);
		await getNotesByArea();
	};

	const handleResourceModeChange = () => {
		setResourcesCreateMode(!resourcesCreateMode);
	};

	console.log(resourcesCreateMode);

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
				`${
					import.meta.env.VITE_AXIOS_URI
				}/projects/delete/${projectId}`,
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
	};

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

	const getNotesByArea = async () => {
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

	const closeTaskModal = async () => {
		setIsTaskModalOpen(false);
		await updateTasks();
	};

	const closeProjectModal = async () => {
		setIsProjectModalOpen(false);
		await updateProjects();
	};

	const handleValueChange = (e, name) => {
		setNewResource(prevResource => ({
			...prevResource,
			[name]: e.target.value,
		}));
	};

	const getResources = async () => {
		try {
			const token = sessionStorage.getItem('token');
			const response = await axios.get(
				`${import.meta.env.VITE_AXIOS_URI}/resources/all`,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			setResources(response.data.resources);
		} catch (error) {
			console.log('Error getting resources.');
		}
	};

	const handleResourceSubmit = async e => {
		e.preventDefault();

		try {
			const resource = {
				userId: userData._id,
				title: newResource.title,
				description: newResource.description,
				link: newResource.link,
			};

			const token = sessionStorage.getItem('token');
			await axios.post(
				`${import.meta.env.VITE_AXIOS_URI}/resources/create`,
				resource,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			setNewResource(initialValue);
			setResourcesCreateMode(false);
			getResources();
		} catch (error) {
			console.log('Error creating the resource', error);
		}
	};

	const deleteResource = async (e, resourceId) => {
		e.preventDefault();
		try {
			const token = sessionStorage.getItem('token');
			await axios.delete(
				`${
					import.meta.env.VITE_AXIOS_URI
				}/resources/delete/${resourceId}`,
				{
					headers: {
						Authorization: token,
					},
				},
			);
			getResources();
		} catch (error) {
			console.log('Error deleting the resource');
		}
	};

	useEffect(() => {
		getProjectsByArea();
		getNotesByArea();
		getResources();
	}, []);

	useEffect(() => {
		const token = sessionStorage.getItem('token');

		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
			setUserData(payload);
			const fetchUserImage = async () => {
				try {
					const res = await axios.get(
						`${import.meta.env.VITE_AXIOS_URI}/users/${
							payload._id
						}`,
						{
							headers: {
								Authorization: token,
							},
						},
					);
					const urlPicture = res.data.user.isExt
						? res.data.user.extPicture
						: res.data.imageUrl;
					setImageUrl(urlPicture);
				} catch (error) {
					console.log(error);
				}
			};
			fetchUserImage();
		}
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

			{isNoteModalOpen && (
				<NewNoteModal
					isOpen={isNoteModalOpen}
					closeModal={closeNoteModal}
					selectedNoteEditable={selectedNoteEditable}
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
												onClick={() =>
													handleProjectDelete(
														project._id,
													)
												}
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
			<div className={styles.rightColumn}>
				<section className={styles.userHub}>
					<div className={styles.social}>
						<a href='https://www.instagram.com/' target='blank'>
							<img src={InstagramIcon} alt='Instagram-icon' />
						</a>

						<a href='https://www.facebook.com/' target='blank'>
							<img src={FacebookIcon} alt='Facebook-icon' />
						</a>

						<a href='https://twitter.com/' target='blank'>
							<img src={TwitterIcon} alt='Twitter-icon' />
						</a>

						<a href='https://web.whatsapp.com/' target='blank'>
							<img src={WhatsappIcon} alt='Whatsapp-icon' />
						</a>

						<a href='http://localhost:8000/todoist/auth'>
							<img src={TodoistGradient} alt='todoist-icon' />
						</a>
					</div>

					<div className={styles.userData}>
						<span className={styles.userContact}>
							<Link to={'/settings'} className={styles.link}>
								<h4>
									{userData && userData.firstName}{' '}
									{userData && userData.lastName}
								</h4>
							</Link>
							<p>{userData && userData.email}</p>
						</span>
						<div className={styles.userPic}>
							<img
								// style={{ height: '50px' }}
								src={imageUrl}
								alt='User-profile-pic'
							/>
						</div>
					</div>
				</section>

				<section className={styles.notes}>
					<h2>MyNotes</h2>

					<div className={styles.noteDisplay}>
						{allNotes.map((note, index) => {
							return (
								<div
									className={styles.noteContainer}
									key={index}>
									<span
										className={styles.notePreview}
										onClick={() => openEditNoteModal(note)}>
										<img
											src={LittleNoteIcon}
											alt='LittleNote-icon'
										/>
										<h6>{note.title}</h6>
									</span>
								</div>
							);
						})}
						<span
							className={styles.newNoteBtn}
							onClick={() => openNoteModal()}>
							<img src={AddIconAqua} alt='AddIcon' />
						</span>
					</div>
				</section>

				<section className={styles.resources}>
					<span
						className={styles.addResource}
						onClick={() => handleResourceModeChange()}>
						<img
							src={resourcesCreateMode ? CloseIcon : AddIconAqua}
							alt='Add-icon'
							className={styles.ResourceIcon}
						/>
					</span>
					<h2>
						{resourcesCreateMode ? 'Create resource' : 'Resources'}
					</h2>

					{resourcesCreateMode ? (
						<div className={styles.resourcesCreateMode}>
							<input
								type='text'
								placeholder='Add title to your resource'
								autoCapitalize='off'
								autoCorrect='off'
								spellCheck='false'
								autoComplete='off'
								autoFocus
								name='title'
								value={newResource.title}
								onChange={e => handleValueChange(e, 'title')}
							/>
							<input
								type='url'
								placeholder='Add the link to the resource'
								autoCapitalize='off'
								autoCorrect='off'
								spellCheck='false'
								autoComplete='off'
								name='link'
								value={newResource.link}
								onChange={e => handleValueChange(e, 'link')}
							/>
							<input
								type='text'
								placeholder='Add a description for your resource'
								autoCapitalize='off'
								autoCorrect='off'
								spellCheck='false'
								autoComplete='off'
								name='description'
								value={newResource.description}
								onChange={e =>
									handleValueChange(e, 'description')
								}
							/>
							{newResource.title.length > 0 &&
							newResource.link.length > 0 ? (
								<button onClick={e => handleResourceSubmit(e)}>
									Add resource
								</button>
							) : (
								<></>
							)}
						</div>
					) : (
						<div className={styles.resourceView}>
							{resources.map(resource => (
								<span key={resource._id}>
									<a
										href={resource.link}
										target='_blank'
										rel='noopener noreferrer'>
										<h6>{resource.title}</h6>
									</a>

									<img
										src={TrashIcon}
										alt='Trash-icon'
										onClick={e =>
											deleteResource(e, resource._id)
										}
									/>
								</span>
							))}
						</div>
					)}
				</section>
			</div>
		</div>
	);
};
