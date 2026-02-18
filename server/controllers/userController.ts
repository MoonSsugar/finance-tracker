import * as userService from '../services/userService';
import { addUserSchema, updateUserSchema } from '../utils/userValidateSchemas';
import type { Request, Response, NextFunction } from "express";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
  
    res.status(200).json(users);    
  } catch(err) {
    next(err);
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const user = await userService.getUser(id);

    if (!user) {
      const error = {
        message: new Error(`Cannot find user with id ${id}`),
        status: 404
      }

      return next(error)
    };

    res.status(200).json(user)
  } catch(err) {
    next(err);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const validatedData = updateUserSchema.parse(req.body);

    const user = await userService.getUser(id);

    if (!user) {
      const error = {
        message: new Error(`Cannot find user with id ${id}`),
        status: 404
      }

      return next(error)
    }

    const updatedUser = await userService.updateUser(id, validatedData);

    res.status(201).json(updatedUser)
  } catch(err) {
    next(err);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const user = await userService.getUser(id);

    if (!user) {
      const error = {
        message: new Error(`Cannot find user with id ${id}`),
        status: 404
      }

      return next(error)
    }

    const deletedUser = await userService.removeUser(id);

    res.status(201).json(deletedUser);
  } catch(err) {
    next(err);
  }
}