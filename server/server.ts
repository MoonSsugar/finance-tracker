import cors from 'cors';
import express from 'express';
import transactionRouter from './routers/transactionRouter';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import { authMiddleware } from './middlewares/authMiddleware';
import { errorHandler, badRequestHandler } from './middlewares/errorMiddleware';
import type { Application } from 'express';

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/transactions', authMiddleware, transactionRouter);
app.use('/api/auth', authRouter);

app.use(badRequestHandler);
app.use(errorHandler);

app.listen("8000", () => console.log("Server started on port 8000"));
