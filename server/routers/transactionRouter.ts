import express from 'express';
import { getTransactions, getTransaction, addTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController';
import type { Router } from 'express';

const transactionRouter: Router = express.Router();

transactionRouter.get('/', getTransactions);
transactionRouter.get('/:id', getTransaction);

transactionRouter.post('/', addTransaction);

transactionRouter.put('/:id', updateTransaction);

transactionRouter.delete('/:id', deleteTransaction);

export default transactionRouter;