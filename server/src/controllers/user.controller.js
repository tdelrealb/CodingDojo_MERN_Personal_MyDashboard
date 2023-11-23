import User from '../models/user.model.js';
import generateAuthToken from '../middlewares/generateToken.middleware.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res, next) => {
	try {
		const userData = req.body;
		const newUser = await User.create(userData);
		await newUser.save();
		const authToken = generateAuthToken(newUser);

		res.status(201).json({
			user: newUser,
			authToken,
		});
	} catch (error) {
		next(error);
	}
};

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(401).json({ error: 'Wrong credentials.' });
		}

		const isPasswordValid = await user.comparePassword(password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Wrong credentials.' });
		}

		const authToken = generateAuthToken(user);
		res.status(200).json({ authToken });
	} catch (error) {
		res.status(500).json({ error: 'Login error.' });
	}
};

const getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}

		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ error: 'Error obtaining user data.' });
	}
};

const updateUser = async (req, res) => {
	const { id } = req.params;
	const userData = req.body;

	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}

		Object.assign(user, userData);

		if (userData.password) {
			user.password = await bcrypt.hash(userData.password, 10);
		}

		const authToken = generateAuthToken(user);

		await user.save();

		res.status(200).json({ user, authToken });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error when updating user.' });
	}
};

export { registerUser, loginUser, getUserById, updateUser };
