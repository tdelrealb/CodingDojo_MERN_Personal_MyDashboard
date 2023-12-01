import express from 'express';
import * as projectController from '../controllers/project.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', projectController.createProject);
router.get('/filter/:area', projectController.filterProjectsByArea);
router.put('/edit/:id', projectController.editProject);
router.delete('/delete/:id', projectController.deleteProject);

export { router };
