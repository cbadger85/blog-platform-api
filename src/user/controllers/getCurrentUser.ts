import { Response, NextFunction } from 'express';
import { IUserRequest } from 'src/auth/types';
import { User } from '../User';
import { sanitizeUser } from '../../utils';
import { NotFound } from '../../utils/errors';

export const getCurrentUser = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  return res.json(sanitizeUser(user));
};
