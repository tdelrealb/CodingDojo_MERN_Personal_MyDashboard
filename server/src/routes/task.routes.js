import express from 'express';
import * as taskController from '../controllers/task.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', taskController.createTask);
router.get('/all', taskController.getTasks);
router.get('/area/:area', taskController.getTasksByArea);
router.get('/project/:projectId', taskController.getTasksByProject);
router.get('/label/:label', taskController.getTasksByLabel);
router.put('/update/:id', taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTask);

export { router };
