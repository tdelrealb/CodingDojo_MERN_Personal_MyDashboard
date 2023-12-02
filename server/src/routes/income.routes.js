import express from 'express';
import * as incomeController from '../controllers/income.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', incomeController.createIncome);
router.get('/all', incomeController.getIncomes);
router.put('/update/:id', incomeController.updateIncome);
router.delete('/delete/:id', incomeController.deleteIncome);

export { router };
