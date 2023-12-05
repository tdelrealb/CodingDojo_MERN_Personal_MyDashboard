import Expense from '../models/expense.model.js';

const createExpense = async (req, res) => {
	const expenseData = req.body;
	const userId = req.user._id;

	try {
		const newExpense = await Expense.create({ ...expenseData, userId });
		await newExpense.save();
		res.status(201).json({ newExpense });
	} catch (error) {
		res.status(500).json({ error: 'Error creating the expense.' });
	}
};

const getExpenses = async (req, res) => {
	const userId = req.user._id;

	try {
		const expenses = await Expense.find({ userId });
		res.status(200).json({ expenses });
	} catch (error) {
		res.status(500).json({ error: 'Error loading the expenses.' });
	}
};

const getExpensesByCategory = async (req, res) => {
	const { category } = req.params;
	const userId = req.user._id;

	try {
		const expenses = await Expense.find({ userId, category });
		res.status(200).json({ expenses });
	} catch (error) {
		res.status(500).json({
			error: 'Error filtering expenses by category.',
		});
	}
};

const updateExpense = async (req, res) => {
	const { id } = req.params;
	const { title, amount, category } = req.body;
	const userId = req.user._id;

	try {
		const updatedExpense = await Expense.findByIdAndUpdate(
			{ _id: id, userId },
			{ title, amount, category },
			{ new: true, runValidators: true },
		);

		if (!updatedExpense) {
			res.status(404).json({ error: 'Expense not found.' });
		}
		res.status(200).json({ expense: updatedExpense });
	} catch (error) {
		res.status(500).json({ error: 'Error updating the expense.' });
	}
};

const deleteExpense = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	try {
		const expense = await Expense.findByIdAndDelete({ _id: id, userId });

		if (!expense) {
			return res.status(404).json({ error: 'Expense not found.' });
		}
		res.status(200).json({ message: 'Expense succesfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the expense.' });
	}
};

export {
	createExpense,
	getExpenses,
	getExpensesByCategory,
	updateExpense,
	deleteExpense,
};
