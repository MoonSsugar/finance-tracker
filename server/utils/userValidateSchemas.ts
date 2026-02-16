import z from 'zod';

export const addUserSchema = z.object({
  email: z.email("Incorrect email"),
  name: z.string().min(2, "Name is too short")
})

export const updateUserSchema = z.object({
  email: z.email("Incorrect email").optional().or(z.literal(undefined)),
  name: z.string().min(2, "Name is too short").optional().or(z.literal(undefined))
});