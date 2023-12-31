import express from 'express';
import dotenv from 'dotenv';
import * as userRoutes from '../routes/user.routes.js';
import * as projectRoutes from '../routes/project.routes.js';
import * as taskRoutes from '../routes/task.routes.js';
import * as noteRoutes from '../routes/note.routes.js';
import * as resourceRoutes from '../routes/resource.routes.js';
import * as habitRoutes from '../routes/habit.routes.js';
import * as incomeRoutes from '../routes/income.routes.js';
import * as expenseRoutes from '../routes/expense.routes.js';
import * as todoistRoutes from '../routes/todoist.routes.js';
import { corsOptions } from '../middlewares/cors.middleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.set('port', process.env.PORT);

app.use(express.json());
app.use('/users', userRoutes.router);
app.use('/projects', projectRoutes.router);
app.use('/tasks', taskRoutes.router);
app.use('/notes', noteRoutes.router);
app.use('/resources', resourceRoutes.router);
app.use('/habits', habitRoutes.router);
app.use('/incomes', incomeRoutes.router);
app.use('/expenses', expenseRoutes.router);
app.use('/todoist', todoistRoutes.router);

export default app;
