import Note from '../models/note.model.js';
import Project from '../models/project.model.js';

const createNote = async (req, res) => {
	const noteData = req.body;
	const userId = req.user._id;

	try {
		const newNote = await Note.create({ ...noteData, userId });
		await newNote.save();
		res.status(201).json({ newNote });
	} catch (error) {
		res.status(500).json({ error: 'Error creating the note.' });
	}
};

const getNotesByArea = async (req, res) => {
	const { area } = req.params;
	const userId = req.user._id;

	try {
		const notes = await Note.find({ userId, area });
		res.status(200).json({ notes });
	} catch (error) {
		res.status(500).json({ error: 'Error filtering notes by area.' });
	}
};

const getNotesByLabel = async (req, res) => {
	const { label } = req.params;
	const userId = req.user._id;

	try {
		const notes = await Note.find({ userId, label });
		res.status(200).json({ notes });
	} catch (error) {
		res.status(500).json({ error: 'Error filtering notes by label.' });
	}
};

const searchNotes = async (req, res) => {
	const { query } = req.params;
	const userId = req.user._id;

	try {
		const notes = await Note.find({
			userId,
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ body: { $regex: query, $options: 'i' } },
				{ label: { $regex: query, $options: 'i' } },
			],
		});
		res.status(200).json({ notes });
	} catch (error) {
		res.status(500).json({ error: 'Error searching for notes.' });
	}
};

const updateNote = async (req, res) => {
	const { id } = req.params;
	const { projectId, area, title, label, body } = req.body;
	const userId = req.user._id;

	try {
		const note = await Note.findOne({ _id: id, userId });

		if (!note) {
			return res.status(404).json({ error: 'Note not found.' });
		}

		if (projectId) {
			const project = await Project.findOne({ _id: projectId, userId });

			if (!project) {
				return res.status(404).json({ error: 'Project not found.' });
			}

			note.projectId = projectId;
		}

		note.area = area;
		note.title = title;
		note.label = label;
		note.body = body;

		await note.save();
		res.status(200).json({ note });
	} catch (error) {
		res.status(500).json({ error: 'Error updating the note.' });
	}
};

const deleteNote = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	try {
		const note = await Note.findByIdAndDelete({ _id: id, userId });

		if (!note) {
			return res.status(404).json({ error: 'Note not found.' });
		}
		res.status(200).json({ message: 'Note succesfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the note.' });
	}
};

export {
	createNote,
	getNotesByArea,
	getNotesByLabel,
	searchNotes,
	updateNote,
	deleteNote,
};
