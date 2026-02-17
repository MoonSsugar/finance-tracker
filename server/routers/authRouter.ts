import express from 'express';
import { registerUser, loginUser } from "../controllers/authController";
import type { Router } from 'express';

const authRouter: Router = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;