import cors from 'cors';

const corsConfig = cors({
	origin: '*',
	methods: 'GET,POST,PUT,DELETE',
	allowedHeaders: '*',
	exposedHeaders: '*',
	credentials: false,
});

export default corsConfig;
