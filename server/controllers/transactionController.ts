import * as transactionService from '../services/transactionService';
import { addTransactionSchema, updateTransactionSchema } from '../utils/transactionValidateSchemas';
import type { Request, Response, NextFunction } from "express";

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error("You do not have an access");
    }
    const userId = req.user.userId;

    const transactions = await transactionService.getTransactions(userId);

    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
}

export const getTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error("You do not have an access");
    }

    const id = parseInt(req.params.id as string);
    const userId = req.user.userId;
    const transaction = await transactionService.getTransaction({ userId, id });

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
    if (!req.user) {
      throw new Error("You do not have an access");
    }

    const userId = req.user.userId;
    const validatedData = addTransactionSchema.parse(req.body);

    const date = validatedData.date ? new Date(validatedData.date) : undefined;

    const data = {
      ...validatedData,
      date
    }

    const newTransaction = await transactionService.addTransaction(userId, data);

    res.status(201).json(newTransaction);
  } catch (err) {
    next(err);
  }
}

export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error("You do not have an access");
    }

    const id = parseInt(req.params.id as string);
    const userId = req.user.userId;
    const validatedData = updateTransactionSchema.parse(req.body);

    const transaction = await transactionService.getTransaction({id, userId});

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

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error("You do not have an access");
    }
    
    const id = parseInt(req.params.id as string);
    const userId = req.user.userId;
    const transaction = await transactionService.getTransaction({id, userId});

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