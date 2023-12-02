import { Schema, model } from 'mongoose';

const IncomeSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		title: {
			type: String,
			required: [true, 'Please give a title to your income.'],
		},

		amount: {
			type: Number,
			required: [true, 'Please give an amount to your income.'],
		},
	},

	{
		timestamps: true,
	},
);

const Income = model('incomes', IncomeSchema);

export default Income;
