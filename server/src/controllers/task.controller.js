import Task from '../models/task.model.js';
import Project from '../models/project.model.js';

const createTask = async (req, res) => {
	const taskData = req.body;
	const userId = req.user._id;

	try {
		const projectId = taskData.projectId;
		const project = await Project.findOne({ _id: projectId, userId });

		if (!project) {
			return res.status(404).json({ error: 'Project not found.' });
		}

		const newTask = await Task.create({ ...taskData, userId, projectId });
		await newTask.save();
		res.status(201).json({ message: newTask });
	} catch (error) {
		res.status(500).json({ error: 'Error creating the task.' });
	}
};

const editTask = async (req, res) => {
	const { id } = req.params;
	const { projectId, title, label, date, status } = req.body;
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

		task.title = title;
		task.label = label;
		task.date = date;
		task.status = status;

		await task.save();

		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ error: 'Error updating the task.' });
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

const filterTasksByProject = async (req, res) => {
	const { projectId } = req.params;
	const userId = req.user._id;

	try {
		const tasks = await Task.find({ userId, projectId });
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ error: 'Error filtering tasks by project.' });
	}
};

const filterTasksByLabel = async (req, res) => {
	const { label } = req.params;
	const userId = req.user._id;

	try {
		const tasks = await Task.find({ userId, label });
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ error: 'Error filtering tasks by label.' });
	}
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	try {
		const deletedTask = await Task.findByIdAndDelete({ _id: id, userId });

		if (!deletedTask) {
			return res
				.status(404)
				.json({ error: 'We were unable to find the task.' });
		}
		res.status(200).json({ message: 'Task succesfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the task.' });
	}
};

export {
	createTask,
	getTasks,
	filterTasksByProject,
	filterTasksByLabel,
	editTask,
	deleteTask,
};
