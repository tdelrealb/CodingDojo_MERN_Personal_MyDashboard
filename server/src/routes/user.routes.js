import express from 'express';
import * as userController from '../controllers/user.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/extLogin', userController.googleLoginUser);
router.get('/:id', validateToken, userController.getUserById);
router.put('/update/:id', validateToken, userController.updateUser);

export { router };
