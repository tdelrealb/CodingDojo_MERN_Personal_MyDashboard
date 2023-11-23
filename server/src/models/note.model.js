import { Schema, model } from 'mongoose';

const NoteSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		title: {
			type: String,
			required: [true, 'Please give a title to your note.'],
		},

		label: {
			type: String,
			required: [true, 'Please assign a category to your note.'],
		},

		body: {
			type: String,
			required: true,
		},
	},

	{
		timestamps: true,
	},
);

const Note = model('notes', NoteSchema);

export default Note;
