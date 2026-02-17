import express from "express";
import { getUsers, getUser, addUser, updateUser, deleteUser } from "../controllers/userController";
import type { Router } from "express";

const userRouter: Router = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);

userRouter.post('/', addUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;