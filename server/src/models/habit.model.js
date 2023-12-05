import { Schema, model } from 'mongoose';

const HabitSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		title: {
			type: String,
			required: [true, 'Please assign a title to your habit.'],
		},

		done: {
			type: Boolean,
			default: false,
		},

		doneOn: {
			type: Array,
			of: Date,
		},
	},

	{
		timestamps: true,
	},
);

const Habit = model('habits', HabitSchema);

export default Habit;
