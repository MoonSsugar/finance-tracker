import { register, login } from "../services/authService";
import type { Request, Response, NextFunction } from "express";

export const registerUser =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Missed a required property");
    }

    const newUser = await register({ email, name, password});

    res.status(201).json(newUser);
  } catch(err) {
    next(err);
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Missed a required property");
    }

    const loggedUser = await login({ email, password });

    res.status(201).json(loggedUser);
  } catch(err) {
    next(err);
  }
}