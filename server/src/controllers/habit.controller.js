import Habit from '../models/habit.model.js';

const createHabit = async (req, res) => {
	const habitData = req.body;
	const userId = req.user._id;

	try {
		const newHabit = await Habit.create({ ...habitData, userId });
		await newHabit.save();
		res.status(201).json({ newHabit });
	} catch (error) {
		res.status(500).json({ error: 'Error creating the habit.' });
	}
};

const getHabits = async (req, res) => {
	const userId = req.user._id;

	try {
		const habits = await Habit.find({ userId });
		res.status(200).json({ habits });
	} catch (error) {
		res.status(500).json({ error: 'Error loading habits.' });
	}
};

const updateHabit = async (req, res) => {
	const { id } = req.params;
	const { title, done, doneOn } = req.body;
	const userId = req.user._id;

	try {
		const updatedHabit = await Habit.findByIdAndUpdate(
			{ _id: id, userId },
			{ title, done, doneOn },
			{ new: true, runValidators: true },
		);

		if (!updatedHabit) {
			res.status(404).json({ error: 'Habit not found.' });
		}
		res.status(200).json({ habit: updatedHabit });
	} catch (error) {
		res.status(500).json({ error: 'Error updating the habit.' });
	}
};

const deleteHabit = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	try {
		const habit = await Habit.findByIdAndDelete({ _id: id, userId });

		if (!habit) {
			res.status(404).json({ error: 'Habit not found.' });
		}
		res.status(200).json({ message: 'Habit succesfully deleted.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting the habit.' });
	}
};

export { createHabit, getHabits, updateHabit, deleteHabit };
