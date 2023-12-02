import { Schema, model } from 'mongoose';

const ResourceSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		title: {
			type: String,
			required: [true, 'Please give a title to this resource.'],
		},

		description: {
			type: String,
		},

		link: {
			type: String,
		},
	},

	{
		timestamps: true,
	},
);

const Resource = model('resources', ResourceSchema);

export default Resource;
