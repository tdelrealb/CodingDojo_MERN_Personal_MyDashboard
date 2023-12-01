import cors from 'cors';

const corsConfig = cors({
	origin: 'http://localhost:5173/',
	methods: 'GET,POST,PUT,DELETE',
	allowedHeaders: '*',
	exposedHeaders: '*',
	credentials: false,
});

export default corsConfig;
