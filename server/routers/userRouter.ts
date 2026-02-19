import express from "express";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/userController";
import type { Router } from "express";

const userRouter: Router = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;