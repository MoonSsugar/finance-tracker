import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const regSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Email is invalid").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

export type Login = z.infer<typeof loginSchema>;
export type Registration = z.infer<typeof regSchema>;