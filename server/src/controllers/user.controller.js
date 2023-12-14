import User from '../models/user.model.js';
import generateAuthToken from '../middlewares/generateToken.middleware.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { s3 } from '../config/awsS3.config.js';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


//CONTROLADOR ORIGINAL
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

//CONTROLADOR CON AWSS3
// const registerUser = async (req, res, next) => {
// 	try {
// 		const userData = req.body;
// 		const file = req.file;
// 		const uniqueKey = uuidv4();
// 		const folderName = 'user-images'
// 		const fileNameWithUuid = `${folderName}/${uniqueKey}-${file.originalname}`;

// 		const uploadParams = {
// 			Bucket: 'my-dashboard-bucket',
// 			Key: fileNameWithUuid,
// 			Body: file.buffer,
// 			ContentType: file.mimetype,
// 		};

// 		const uploadCommands = new PutObjectCommand(uploadParams);

// 		const data = await s3.send(uploadCommands);
// 		console.log('Successfully uploaded ', data);

// 		userData.userPicture = uploadParams.Key;

// 		const newUser = await User.create(userData);
// 		await newUser.save();
// 		const authToken = generateAuthToken(newUser);

// 		res.status(201).json({
// 			user: newUser,
// 			authToken,
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };
			
	

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

const googleLoginUser = async (req, res) => {
	const email = req.body.email;
	
	try {
		//check if user exists
		const googleUser = await User.findOne({ email });
		
		if (googleUser){
			const authToken = generateAuthToken(googleUser);
			res.status(200).json({ authToken });
		} else {
			const userData = req.body;
			const newUser = await User.create(userData);
			await newUser.save();
			const authToken = generateAuthToken(newUser);

			res.status(201).json({
				user: newUser,
				authToken,
			});
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
};

//CONTROLADOR ORIGINAL
// const getUserById = async (req, res) => {
// 	const { id } = req.params;

// 	try {
// 		const user = await User.findById(id);

// 		if (!user) {
// 			return res.status(404).json({ error: 'User not found.' });
// 		}

// 		res.status(200).json({ user });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error obtaining user data.' });
// 	}
// };

//CONTROLADOR CON AWSS3
const getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}

		if(!user.userPicture){
			return res.status(404).json({ error: 'User picture not found.' });
		}

		const command = new GetObjectCommand({
			Bucket: 'my-dashboard-bucket',
			Key: user.userPicture,
		});

		const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

		res.status(200).json({ user, imageUrl: url });
	} catch (error) {
		res.status(500).json({ error: 'Error obtaining user data.' });
	}
};

//CONTROLADOR ORIGINAL
// const updateUser = async (req, res) => {
// 	const { id } = req.params;
// 	const userData = req.body;

// 	try {
// 		const user = await User.findById(id);

// 		if (!user) {
// 			return res.status(404).json({ error: 'User not found.' });
// 		}

// 		Object.assign(user, userData);

// 		if (userData.password) {
// 			user.password = await bcrypt.hash(userData.password, 10);
// 		}

// 		const authToken = generateAuthToken(user);

// 		await user.save();

// 		res.status(200).json({ user, authToken });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ error: 'Error when updating user.' });
// 	}
// };

//CONTROLADOR CON AWSS3
const updateUser = async (req, res) => {
	const { id } = req.params;
	const userData = req.body;

	try {
		const user = await User.findById(id);
		
		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}

		Object.assign(user, userData);

		//Handle image upload
		if(req.file){
			const uniqueKey = uuidv4();
			const folderName = 'user-images'
			const fileNameWithUuid = `${folderName}/${uniqueKey}-${req.file.originalname}`;

			const uploadParams = {
				Bucket: 'my-dashboard-bucket',
				Key: fileNameWithUuid,
				Body: req.file.buffer,
				ContentType: req.file.mimetype,
			};

			const uploadCommands = new PutObjectCommand(uploadParams);

			const data = await s3.send(uploadCommands);
			console.log('Successfully uploaded ', data);

			user.userPicture = uploadParams.Key;
		}

		const authToken = generateAuthToken(user);

		await user.save();

		res.status(200).json({ user, authToken });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error when updating user.' });
	}
};

export { registerUser, loginUser, googleLoginUser, getUserById, updateUser };
