import { register, login } from "../services/authService";
import type { Request, Response, NextFunction } from "express";
import type { ResponseError } from "../types/types";

export const registerUser =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error: ResponseError = new Error("Missed required properties");
      error.status = 400;

      return next(error);
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
      const error: ResponseError = new Error("Missed a required property");
      error.status = 400;
      
      return next(error);
    }

    const loggedUser = await login({ email, password });

    res.status(201).json(loggedUser);
  } catch(err) {
    next(err);
  }
}