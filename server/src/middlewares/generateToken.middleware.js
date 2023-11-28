import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY
	? process.env.JWT_SECRET_KEY
	: 'default_secret_key';

const generateAuthToken = user => {
	const token = jwt.sign(
		{
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			username: user.username,
		},
		secretKey,
		{ expiresIn: '1d' },
	);
	return token;
};

export default generateAuthToken;
