import express from 'express';
import dotenv from 'dotenv';
import * as userRoutes from '../routes/user.routes.js';

dotenv.config();

const app = express();

app.set('port', process.env.PORT);

app.use(express.json());
app.use('/users', userRoutes.router);

export default app;
