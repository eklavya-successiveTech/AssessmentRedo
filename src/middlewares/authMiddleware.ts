import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){
    throw new Error('JWT_SECRET is not found')
}

export interface AuthenticateRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: "admin" | "user";
  };
}

export const authenticate = (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw createError(401,'Authorization header missing');
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: 'admin' | 'user';
    };

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
