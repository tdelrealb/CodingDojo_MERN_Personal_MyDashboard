import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		area: {
			type: String,
			required: [true, 'Please assign this project to an area.'],
		},

		title: {
			type: String,
			required: [true, 'Please give a title to your project.'],
			unique: true
		},

		description: {
			type: String,
		},
	},

	{
		timestamps: true,
	},
);

const Project = model('projects', ProjectSchema);

export default Project;
