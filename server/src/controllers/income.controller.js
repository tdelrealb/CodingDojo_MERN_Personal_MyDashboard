import Income from '../models/income.model.js';

const createIncome = async (req, res) => {
	const incomeData = req.body;
	const userId = req.user._id;

	try {
		const newIncome = await Income.create({ ...incomeData, userId });
		await newIncome.save();
		res.status(201).json({ newIncome });
	} catch (error) {
		res.status(500).json({ error: 'Error creating the income.' });
	}
};

const getIncomes = async (req, res) => {
	const userId = req.user._id;

	try {
		const incomes = await Income.find({ userId });
		res.status(200).json({ incomes });
	} catch (error) {
		res.status(500).json({ error: 'Error loading incomes.' });
	}
};

const updateIncome = async (req, res) => {
	const { id } = req.params;
	const { title, amount } = req.body;
	const userId = req.user._id;

	try {
		const updatedIncome = await Income.findByIdAndUpdate(
			{ _id: id, userId },
			{ title, amount },
			{ new: true, runValidators: true },
		);

		if (!updatedIncome) {
			res.status(404).json({ error: 'Income not found.' });
		}
		res.status(200).json({ income: updatedIncome });
	} catch (error) {
		res.status(500).json({ error: 'Error updating the income.' });
	}
};

const deleteIncome = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	try {
		const income = await Income.findByIdAndDelete({ _id: id, userId });

		if (!income) {
			return res.status(404).json({ error: 'Income not found.' });
		}
		res.status(200).json({ message: 'Income succesfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the income.' });
	}
};

export { createIncome, getIncomes, updateIncome, deleteIncome };
