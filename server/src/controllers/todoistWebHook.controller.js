import Project from '../models/project.model.js';
import User from '../models/user.model.js';

export const handleWebHook = async (req, res)  => {
    const event = req.body;

    console.log('Received Event: ', event);

    if(event.event_name === 'project:added'){
        const todoistUserId = event.initiator.id;
        const user = await User.findOne({ todoistId: todoistUserId });
        if (!user) {
            console.log('User not found');
            return res.status(404).end();
        }

        const projectData = {
            title: event.event_data.name,
            todoistProjectId: event.event_data.id,
            // Set default values or look up based on user or project data
            area: 'Default Area',
            description: 'No description',
            userId: user._id,
        };

        const newProject = await Project.create(projectData);
        await newProject.save();

        console.log('Project Added: ', newProject);
    }

    res.status(200).end();
}