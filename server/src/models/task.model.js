import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		projectId: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
			required: [true, 'Please assign this task to a project.'],
		},

		title: {
			type: String,
			required: [true, 'Please give a title to your new task.'],
		},

		label: {
			type: String,
			required: [true, 'Please assign a category to your task.'],
		},

		status: {
			type: String,
			required: [true, 'Please give a status to your task.']
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
