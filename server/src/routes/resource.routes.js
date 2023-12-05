import express from 'express';
import * as resourceController from '../controllers/resource.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', resourceController.createResource);
router.get('/all', resourceController.getResources);
router.put('/update/:id', resourceController.updateResource);
router.delete('/delete/:id', resourceController.deleteResource);

export { router };
