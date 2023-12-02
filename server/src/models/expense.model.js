import { Schema, model } from 'mongoose';

const ExpenseSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		title: {
			type: String,
			required: [true, 'Please give a title to your expense.'],
		},

		amount: {
			type: Number,
			required: [true, 'Please give an amount to your expense.'],
		},

		category: {
			type: String,
			required: [true, 'Please assign this expense to a category.'],
		},
	},

	{
		timestamps: true,
	},
);

const Expense = model('expenses', ExpenseSchema);

export default Expense;
