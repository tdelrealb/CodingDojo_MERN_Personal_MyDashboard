import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		area: {
			type: String,
			required: [true, 'Please assign this task to an area.'],
		},

		title: {
			type: String,
			required: [true, 'Please give a title to your new task.'],
		},

		label: {
			type: String,
			required: [true, 'Please assign a category to your task.'],
		},

		date: {
			type: Date,
			default: Date.now,
			required: false,
		},
	},

	{
		timestamps: true,
	},
);

const Task = model('tasks', TaskSchema);

export default Task;
