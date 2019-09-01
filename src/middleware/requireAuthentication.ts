import { NextFunction, Response } from 'express';
import { UserRequest } from 'src/auth/types';
import { Unauthorized } from '../utils/errors';

export const requireAuthentication = () => {
  return (req: UserRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new Unauthorized());
    }

    return next();
  };
};
