import { Schema, model } from 'mongoose';

const NoteSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		projectId: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
		},

		area: {
			type: String,
			required: [true, 'Please assign this note to an area.'],
		},

		title: {
			type: String,
			required: [true, 'Please give a title to your note.'],
		},

		label: {
			type: String,
			required: [true, 'Please assign a label to your note.'],
		},

		body: {
			type: String,
			required: [true, 'Please give a body to your note.'],
		},
	},

	{
		timestamps: true,
	},
);

const Note = model('notes', NoteSchema);

export default Note;
