import express from 'express';
import transactionRouter from './routers/transactionRouter';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import { errorHandler, badRequestHandler } from './middlewares/errorMiddleware';
import type { Application } from 'express';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/auth', authRouter);

app.use(badRequestHandler);
app.use(errorHandler);

app.listen("8000", () => console.log("Server started on port 8000"));
