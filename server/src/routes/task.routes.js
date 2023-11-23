import express from 'express';
import * as taskController from '../controllers/task.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', taskController.createTask);
router.get('/all', taskController.getTasks);
router.get('/filter/area/:area', taskController.filterTasksByArea);
router.get('/filter/label/:label', taskController.filterTasksByLabel);
router.put('/edit/:id', taskController.editTask);
router.delete('/delete/:id', taskController.deleteTask);

export { router };
