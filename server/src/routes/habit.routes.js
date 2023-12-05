import express from 'express';
import * as habitController from '../controllers/habit.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', habitController.createHabit);
router.get('/all', habitController.getHabits);
router.put('/update/:id', habitController.updateHabit);
router.delete('/delete/:id', habitController.deleteHabit);

export { router };
