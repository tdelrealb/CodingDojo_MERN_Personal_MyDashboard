import Task from '../models/task.model.js';
import Project from '../models/project.model.js';
import axios from 'axios';

//CONTROLADOR ORIGINAL
// const createTask = async (req, res) => {
// 	const taskData = req.body;
// 	const userId = req.user._id;

// 	try {
// 		const projectId = taskData.projectId;
// 		const project = await Project.findOne({ _id: projectId, userId });

// 		if (!project) {
// 			return res.status(404).json({ error: 'Project not found.' });
// 		}

// 		const newTask = await Task.create({ ...taskData, userId, projectId });
// 		await newTask.save();
// 		res.status(201).json({ message: newTask });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error creating the task.' });
// 	}
// };

//CONTROLADOR CON TODOIST
const createTask = async (req, res) => {
    const taskData = req.body;
    const userId = req.user._id;
    const { access_token } = req.cookies;

    try {
        const projectId = taskData.projectId;
        const project = await Project.findOne({ _id: projectId, userId });

        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        // Send the task to Todoist
        const todoistResponse = await axios.post('https://api.todoist.com/rest/v2/tasks', {
            content: taskData.title, 
            project_id: project.todoistProjectId, 
        }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        
        const newTask = await Task.create({ 
            ...taskData, 
            userId, 
            projectId,
            todoistTaskId: todoistResponse.data.id, 
        });

        await newTask.save();

        res.status(201).json({ message: newTask, todoistTask: todoistResponse.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating the task.' });
    }
};

const getTasks = async (req, res) => {
	const userId = req.user._id;

	try {
		const tasks = await Task.find({ userId });
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ error: 'Error loading tasks.' });
	}
};

const getTasksByArea = async (req, res) => {
	const { area } = req.params;
	const userId = req.user._id;

	try {
		const tasks = await Task.find({ userId, area });
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ error: 'Error filtering tasks by area.' });
	}
};

const getTasksByProject = async (req, res) => {
	const { projectId } = req.params;
	const userId = req.user._id;

	try {
		const tasks = await Task.find({ userId, projectId });
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ error: 'Error filtering tasks by project.' });
	}
};

const getTasksByLabel = async (req, res) => {
	const { label } = req.params;
	const userId = req.user._id;

	try {
		const tasks = await Task.find({ userId, label });
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ error: 'Error filtering tasks by label.' });
	}
};

const updateTask = async (req, res) => {
	const { id } = req.params;
	const { area, projectId, title, date, label, status } = req.body;
	const userId = req.user._id;

	try {
		const task = await Task.findOne({ _id: id, userId });

		if (!task) {
			return res.status(404).json({ error: 'Task not found.' });
		}

		if (projectId) {
			const project = await Project.findOne({ _id: projectId, userId });

			if (!project) {
				return res.status(404).json({ error: 'Project not found.' });
			}

			task.projectId = projectId;
		}

		task.area = area;
		task.title = title;
		task.date = date;
		task.label = label;
		task.status = status;

		await task.save();
		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ error: 'Error updating the task.' });
	}
};









//CONTROLADOR ORIGINAL
// const deleteTask = async (req, res) => {
// 	const { id } = req.params;
// 	const userId = req.user._id;

// 	try {
// 		const deletedTask = await Task.findByIdAndDelete({ _id: id, userId });

// 		if (!deletedTask) {
// 			return res.status(404).json({ error: 'Task not found.' });
// 		}
// 		res.status(200).json({ message: 'Task succesfully deleted.' });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error deleting the task.' });
// 	}
// };

//CONTROLADOR CON TODOIST
const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { access_token } = req.cookies;

    try {
        const task = await Task.findOne({ _id: id, userId });

        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        // Delete the task in Todoist
        await axios.delete(`https://api.todoist.com/rest/v2/tasks/${task.todoistTaskId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        // Delete the task in the database
        await Task.findByIdAndDelete({ _id: id, userId });

        res.status(200).json({ message: 'Task successfully deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting the task.' });
    }
};

export {
	createTask,
	getTasks,
	getTasksByArea,
	getTasksByProject,
	getTasksByLabel,
	updateTask,
	deleteTask,
};
