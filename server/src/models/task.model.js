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

		projectId: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
		},

		title: {
			type: String,
			required: [true, 'Please give a title to your new task.'],
		},

		date: {
			type: Date,
			default: Date.now(),
		},

		label: {
			type: String,
			required: [true, 'Please give a label to your task.'],
		},

		status: {
			type: String,
			required: [true, 'Please give a status to your task.'],
		},
	},

	{
		timestamps: true,
	},
);

const Task = model('tasks', TaskSchema);

export default Task;
