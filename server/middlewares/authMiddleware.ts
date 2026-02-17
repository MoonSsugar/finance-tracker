import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: "No token provided" })
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ msg: "Servero Error" });
  }

  try {
    const decoded = jwt.verify(token, secret) as ({ userId: number, email: string });

    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalid" })
  }
}