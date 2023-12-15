import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY
	? process.env.JWT_SECRET_KEY
	: 'default_secret_key';

const validateToken = (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) {
		return res
			.status(401)
			.json({ error: 'Unauthorized access. Token not provided.' });
	}

	try {
		const decoded = jwt.verify(token, secretKey);

		req.user = decoded;
		// console.log(decoded);

		next();
	} catch (error) {
		return res
			.status(401)
			.json({ error: 'Unauthorized access. Invalid token.' });
	}
};

export default validateToken;
