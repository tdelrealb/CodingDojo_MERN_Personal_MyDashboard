import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const corsOptions = {
    origin: [process.env.FRONT_URI, 'login-59271.firebaseapp.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

export {corsOptions};