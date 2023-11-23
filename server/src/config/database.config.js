import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI
	? process.env.MONGODB_URI
	: 'mongodb://127.0.9.1:27017/my-dashboard';

mongoose.connect(URI);

const connection = mongoose.connection;

connection
	.once('open', () => {
		console.log(`Database successfully connected: ${URI}`);
	})
	.on('error', error => {
		console.log(`An error occurred: ${error}`);
	});
