import Note from '../models/note.model.js';

const createNote = async (req, res) => {
	const noteData = req.body;
	const userId = req.user._id;

	try {
		const newNote = await Note.create({ ...noteData, userId });
		await newNote.save();
		res.status(201).json({ message: newNote });
	} catch (error) {
		res.status(500).json({ error: 'Error creating the note.' });
	}
};

const getNotes = async (req, res) => {
	const userId = req.user._id;

	try {
		const notes = await Note.find({ userId });
		res.status(200).json({ notes });
	} catch (error) {
		res.status(500).json({ error: 'Error loading notes.' });
	}
};

const filterNotesByArea = async (req, res) => {
	const { area } = req.params;
	const userId = req.user._id;

	try {
		const notes = await Note.find({ userId, area });
		res.status(200).json({ notes });
	} catch (error) {
		res.status(500).json({ error: 'Error filtering notes by area.' });
	}
};

const filterNotesByLabel = async (req, res) => {
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
			],
		});
		res.status(200).json({ notes });
	} catch (error) {
		res.status(500).json({ error: 'Error searching for notes.' });
	}
};

const editNote = async (req, res) => {
	const { id } = req.params;
	const { area, title, label, body } = req.body;
	const userId = req.user._id;

	try {
		const updatedNote = await Note.findOneAndUpdate(
			{ _id: id, userId },
			{ area, title, label, body },
			{ new: true, runValidators: true },
		);

		if (!updatedNote) {
			res.status(404).json({ error: 'Note not found.' });
		}
		res.status(200).json({ note: updatedNote });
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
			return res
				.status(404)
				.json({ error: 'We were unable to find the note.' });
		}
		res.status(200).json({ message: 'Note succesfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the note.' });
	}
};

export {
	createNote,
	getNotes,
	filterNotesByArea,
	filterNotesByLabel,
	searchNotes,
	editNote,
	deleteNote,
};
