import { prisma } from "../lib/prisma";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { ResponseError } from "../types/types";

export const register = async ({ email, password, name }: { email: string, password: string, name: string }) => {
  const existing = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (existing) {
    const error: ResponseError = new Error("User with this email already exists");
    error.status = 409;

    throw error;
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hash,
      name
    },
    select: {
      id: true,
      name: true,
      email: true,
    }
  });

  return newUser;
}

export const login = async ({ email, password }: { email: string, password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    const error: ResponseError = new Error("User with this email does not exist");
    error.status = 404;

    throw error;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    const error: ResponseError = new Error("Password or email is not correct");
    error.status = 400;

    throw error;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret is not defined on server")
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    secret,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}