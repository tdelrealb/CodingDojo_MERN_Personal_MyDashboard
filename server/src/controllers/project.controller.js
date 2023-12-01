import Project from '../models/project.model.js';

const createProject = async (req, res) => {
	const projectData = req.body;
	const userId = req.user._id;

	try {
		const newProject = await Project.create({ ...projectData, userId });
		await newProject.save();
		res.status(201).json({ message: newProject });
	} catch (error) {
		res.status(500).json({ error: 'Error creating the project.' });
	}
};

const filterProjectsByArea = async (req, res) => {
	const { area } = req.params;
	const userId = req.user._id;

	try {
		const projects = await Project.find({ userId, area });
		res.status(200).json({ projects });
	} catch (error) {
		res.status(500).json({ error: 'Error filtering projects by area.' });
	}
};

const editProject = async (req, res) => {
	const { id } = req.params;
	const { area, title, description } = req.body;
	const userId = req.user._id;

	try {
		const updatedProject = await Project.findByIdAndUpdate(
			{ _id: id, userId },
			{ area, title, description },
			{ new: true, runValidators: true },
		);

		if (!updatedProject) {
			res.status(404).json({ error: 'Project not found.' });
		}
		res.status(200).json({ project: updatedProject });
	} catch (error) {
		res.status(500).json({ error: 'Error updating the project.' });
	}
};

const deleteProject = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	try {
		const project = await Project.findByIdAndDelete({ _id: id, userId });

		if (!project) {
			return res
				.status(404)
				.json({ error: 'We were unable to find the project.' });
		}
		res.status(200).json({ message: 'Project succesfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the project.' });
	}
};

export { createProject, filterProjectsByArea, editProject, deleteProject };
