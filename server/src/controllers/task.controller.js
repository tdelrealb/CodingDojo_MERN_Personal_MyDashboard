import Task from '../models/task.model.js';

const createTask = async (req, res) => {
	const taskData = req.body;
	const userId = req.user._id;

	try {
		const task = await Task.create({ ...taskData, userId });
		await task.save();
		res.status(201).json({ message: task });
	} catch (error) {
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

const filterTasksByArea = async (req, res) => {
	const { area } = req.params;
	const userId = req.user._id;

	try {
		const tasks = await Task.find({ userId, area });

		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ error: 'Error when filtering tasks by area.' });
	}
};

const filterTasksByLabel = async (req, res) => {
	const { label } = req.params;
	const userId = req.user._id;

	try {
		const tasks = await Task.find({ userId, label });
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ error: 'Error when filtering tasks by label.' });
	}
};

const editTask = async (req, res) => {
	const { id } = req.params;
	const { area, title, label, date } = req.body;
	const userId = req.user._id;

	try {
		const uptadedTask = await Task.findByIdAndUpdate(
			{ _id: id, userId },
			{ area, title, label, date },
			{ new: true, runValidators: true },
		);

		if (!uptadedTask) {
			res.status(404).json({ error: 'Task not found.' });
		}
		res.status(200).json({ task: uptadedTask });
	} catch (error) {
		res.status(500).json({ error: 'Error updating the task.' });
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
		res.status(200).json({ message: 'Task successfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the task.' });
	}
};

export {
	createTask,
	getTasks,
	filterTasksByArea,
	filterTasksByLabel,
	editTask,
	deleteTask,
};
