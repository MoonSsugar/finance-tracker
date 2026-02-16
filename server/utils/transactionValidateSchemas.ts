import z from 'zod';

export const addTransactionSchema = z.object({
  amount: z.number("Amount must be a number"),
  category: z.string(),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.string().optional().or(z.literal(undefined)),
})

export const updateTransactionSchema = z.object({
  amount: z.number("Amount must be a number").or(z.literal(0)),
  category: z.string().or(z.literal("")),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.string().optional().or(z.literal(undefined)),
})

export type UpdateTxDto = z.infer<typeof updateTransactionSchema>