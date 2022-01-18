import { Request, Response, NextFunction as Next, response } from 'express';
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (req: Request, res: Response, next: Next) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};