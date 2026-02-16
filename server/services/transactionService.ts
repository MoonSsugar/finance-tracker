import { prisma } from "../lib/prisma";
import type { UpdateTxDto } from "../utils/transactionValidateSchemas";

interface CreateTxDto {
  amount: number,
  category: string,
  type: 'INCOME' | 'EXPENSE',
  date?: Date | undefined
}

export const getTransactions = async (userId: number) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId
    },
    include: {
      user: true
    }
  })

  return transactions;
}

export const getTransaction = async (userId: number, id: number) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id,
      userId
    },
    include: {
      user: true
    }
  });

  return transaction;
}

export const addTransaction = async (userId: number, data: CreateTxDto) => {
  const newTransaction = await prisma.transaction.create({
    data: {
      userId,
      amount: data.amount,
      category: data.category,
      type: data.type,
      ...(data.date && { date: data.date })
    },
    include: {
      user: true
    }
  });

  return newTransaction;
}

export const updateTransaction = async (id: number, userId: number, data: UpdateTxDto) => {
  const existing = await prisma.transaction.findUnique({ where: { id } });

  if (!existing || existing.userId !== userId) {
    throw new Error("You do not have a permission or user does not exist")
  }

  const updatedTransaction = await prisma.transaction.update({
    where: {
      id,
    },
    data: {
      ...(data.amount && { amount: data.amount }),
      ...(data.category && { category: data.category }),
      ...(data.date && { date: data.date }),
      ...(data.type && { type: data.type })
    },
    include: {
      user: true
    }
  });

  return updatedTransaction;
}

export const removeTransaction = async (id: number, userId: number) => {
  const exisitng = await prisma.transaction.findUnique({ where: { id } });

  if (!exisitng || exisitng.userId !== userId) {
    throw new Error("You do not have a permission or user does not exist")
  }

  const removedTransaction = await prisma.transaction.delete({
    where: {
      id
    },
    include: {
      user: true
    }
  });

  return removedTransaction;
}