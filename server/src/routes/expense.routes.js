import express from 'express';
import * as expenseController from '../controllers/expense.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

router.use(validateToken);

router.post('/create', expenseController.createExpense);
router.get('/all', expenseController.getExpenses);
router.get('/category/:category', expenseController.getExpensesByCategory);
router.put('/update/:id', expenseController.updateExpense);
router.delete('/delete/:id', expenseController.deleteExpense);

export { router };
