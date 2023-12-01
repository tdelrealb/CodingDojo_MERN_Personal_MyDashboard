import express from 'express';
import dotenv from 'dotenv';
import corsConfig from '../middlewares/cors.middleware.js';
import * as userRoutes from '../routes/user.routes.js';
import * as projectRoutes from '../routes/project.routes.js';
import * as taskRoutes from '../routes/task.routes.js';
import * as noteRoutes from '../routes/note.routes.js';

dotenv.config();

const app = express();

app.use(corsConfig);
app.set('port', process.env.PORT);

app.use(express.json());
app.use('/users', userRoutes.router);
app.use('/projects', projectRoutes.router);
app.use('/tasks', taskRoutes.router);
app.use('/notes', noteRoutes.router);

export default app;
