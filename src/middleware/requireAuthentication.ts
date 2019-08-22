import { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../errors/Unauthorized';
import { IUserRequest } from 'src/auth/types';

export const requireAuthentication = () => {
  return (req: IUserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      const error = new Unauthorized();
      return next(error);
    }

    return next();
  };
};
