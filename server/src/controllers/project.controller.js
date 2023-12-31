import Project from '../models/project.model.js';
import axios from 'axios';

//CONTROLADOR ORIGINAL
// const createProject = async (req, res) => {
// 	const projectData = req.body;
// 	const userId = req.user._id;

// 	try {
// 		const newProject = await Project.create({ ...projectData, userId });
// 		await newProject.save();
// 		res.status(201).json({ newProject });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error creating the project.' });
// 	}
// };

// //CONTROLADOR CON TODOIST
// const createProject = async (req, res) => {
// 	const projectData = req.body;
// 	const userId = req.user._id;
// 	const { access_token } = req.cookies;

// 	try {
// 		const newProject = await Project.create({ ...projectData, userId });
// 		await newProject.save();

// 		const todoistResponse = await axios.post('https://api.todoist.com/rest/v2/projects',{
// 			name: newProject.title,

// 		},
// 		{
// 			headers: {
// 				Authorization: `Bearer ${access_token}`,
// 			},
// 		});

// 		newProject.todoistProjectId = todoistResponse.data.id;
// 		await newProject.save();
// 		res.status(201).json({ newProject, todoistProject: todoistResponse.data})
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ error:'Error creating the project.'})
// 	}
// };

// CONTROLADOR CON TODOIST APARTE

const createProject = async (req, res) => {
    const projectData = req.body;
    const userId = req.user._id;
    const { access_token } = req.cookies;

    try {
        const newProject = await Project.create({ ...projectData, userId });
        await newProject.save();

        let todoistProjectId;

        try {
            const todoistResponse = await axios.post('https://api.todoist.com/rest/v2/projects', {
                name: newProject.title,
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            todoistProjectId = todoistResponse.data.id;
        } catch (todoistError) {
            console.error('Error creating Todoist project:', todoistError);
        }

        if (todoistProjectId) {
            newProject.todoistProjectId = todoistProjectId;
            await newProject.save();
        }

        res.status(201).json({ newProject, todoistProjectId });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Error creating the project.' });
    }
};

const getProjectsByArea = async (req, res) => {
	const { area } = req.params;
	const userId = req.user._id;

	try {
		const projects = await Project.find({ userId, area });
		res.status(200).json({ projects });
	} catch (error) {
		res.status(500).json({ error: 'Error filtering projects by area.' });
	}
};

const updateProject = async (req, res) => {
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
			return res.status(404).json({ error: 'Project not found.' });
		}
		res.status(200).json({ message: 'Project succesfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the project.' });
	}
};

export { createProject, getProjectsByArea, updateProject, deleteProject };
