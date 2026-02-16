import * as transactionService from '../services/transactionService';
import { addTransactionSchema, updateTransactionSchema } from '../utils/transactionValidateSchemas';
import type { Request, Response, NextFunction } from "express";

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string)
    const transactions = await transactionService.getTransactions(id);

    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
}

export const getTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const userId = parseInt(req.query.userId as string);
    const transaction = await transactionService.getTransaction(id, userId);

    if (!transaction) {
      const error = {
        message: new Error(`There is no transaction with id ${id} in this user or user with ${userId} does not exist`),
        status: 404
      }

      return next(error)
    }

    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
}

export const addTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.query.userId as string)
    const validatedData = addTransactionSchema.parse(req.body);

    const date = validatedData.date ? new Date(validatedData.date) : undefined;

    const data = {
      ...validatedData,
      date
    }

    const newTransaction = transactionService.addTransaction(userId, data);

    res.status(201).json(newTransaction);
  } catch (err) {
    next(err);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const userId = parseInt(req.query.userId as string);
    const validatedData = updateTransactionSchema.parse(req.body);

    const transaction = await transactionService.getTransaction(id, userId);

    if (!transaction) {
      const error = {
        message: new Error(`There is no transaction with id ${id} in this user or user with ${userId} does not exist`),
        status: 404
      }

      return next(error)
    }

    const updatedTransaction = await transactionService.updateTransaction(id, userId, validatedData);

    res.status(201).json(updatedTransaction)
  } catch (err) {
    next(err);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const userId = parseInt(req.query.userId as string);
    const transaction = await transactionService.getTransaction(id, userId);

    if (!transaction) {
      const error = {
        message: new Error(`There is no transaction with id ${id} in this user or user with ${userId} does not exist`),
        status: 404
      }

      return next(error)
    }

    const deletedTransaction = await transactionService.removeTransaction(id, userId);

    res.status(201).json(deletedTransaction);
  } catch (err) {
    next(err);
  }
}