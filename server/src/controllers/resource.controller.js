import Resource from '../models/resource.model.js';

const createResource = async (req, res) => {
	const resourceData = req.body;
	const userId = req.user._id;

	try {
		const newResource = await Resource.create({ ...resourceData, userId });
		await newResource.save();
		res.status(201).json({ newResource });
	} catch (error) {
		res.status(500).json({ error: 'Error creating the resource.' });
	}
};

const getResources = async (req, res) => {
	const userId = req.user._id;

	try {
		const resources = await Resource.find({ userId });
		res.status(200).json({ resources });
	} catch (error) {
		res.status(500).json({ error: 'Error loading resources.' });
	}
};

const updateResource = async (req, res) => {
	const { id } = req.params;
	const { title, description, link } = req.body;
	const userId = req.user._id;

	try {
		const updatedResource = await Resource.findOneAndUpdate(
			{ _id: id, userId },
			{ title, description, link },
			{ new: true, runValidators: true },
		);

		if (!updatedResource) {
			res.status(404).json({ error: 'Resource not found.' });
		}
		res.status(200).json({ resource: updatedResource });
	} catch (error) {
		res.status(500).json({ error: 'Error updating the resource.' });
	}
};

const deleteResource = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	try {
		const resource = await Resource.findByIdAndDelete({ _id: id, userId });

		if (!resource) {
			return res.status(404).json({ error: 'Resource not found.' });
		}
		res.status(200).json({ message: 'Resource succesfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the resource.' });
	}
};

export { createResource, getResources, updateResource, deleteResource };
