import { prisma } from "../lib/prisma";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const register = async ({ email, password, name }: { email: string, password: string, name: string }) => {
  const existing = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (existing) {
    throw new Error("User with this email already exists");
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
    throw new Error("User with this email does not exist");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Password is not correct");
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