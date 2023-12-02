import express from 'express';
import * as projectController from '../controllers/project.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', projectController.createProject);
router.get('/area/:area', projectController.getProjectsByArea);
router.put('/update/:id', projectController.updateProject);
router.delete('/delete/:id', projectController.deleteProject);

export { router };
