import type { Request, Response, NextFunction } from "express";

interface ResErr {
  message: string,
  status: number
}

export const errorHandler = (err: ResErr, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({ msg: message });

  next();
}

export const badRequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ msg: "Cannot find this route" });

  next();
}