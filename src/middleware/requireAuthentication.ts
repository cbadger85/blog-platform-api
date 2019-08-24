import { NextFunction, Response } from 'express';
import { IUserRequest } from 'src/auth/types';
import { Unauthorized } from '../utils/errors';

export const requireAuthentication = () => {
  return (req: IUserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      const error = new Unauthorized();
      return next(error);
    }

    return next();
  };
};
