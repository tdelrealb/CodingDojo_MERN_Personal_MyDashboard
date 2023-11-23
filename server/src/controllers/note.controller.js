import Note from '../models/note.model.js';

const createNote = async (req, res) => {
	const noteData = req.body;
	const userId = req.user._id;

	try {
		const note = await Note.create({ ...noteData, userId });
		await note.save();
		res.status(201).json({ message: note });
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

const filterNotesByLabel = async (req, res) => {
	const { label } = req.params;
	const userId = req.user._id;

	try {
		const notes = await Note.find({ userId, label });
		res.status(200).json({ notes });
	} catch (error) {
		res.status(500).json({ error: 'Error when filtering notes by label.' });
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
	const { title, label, body } = req.body;
	const userId = req.user._id;

	try {
		const updatedNote = await Note.findOneAndUpdate(
			{ _id: id, userId },
			{ title, label, body },
			{ new: true },
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
		const deletedNote = await Note.findByIdAndDelete({ _id: id, userId });

		if (!deletedNote) {
			return res
				.status(404)
				.json({ error: 'We were unable to find the note.' });
		}
		res.status(200).json({ message: 'Note successfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the note.' });
	}
};

export {
	createNote,
	getNotes,
	filterNotesByLabel,
	searchNotes,
	editNote,
	deleteNote,
};
