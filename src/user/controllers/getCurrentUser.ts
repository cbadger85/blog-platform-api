import { Response, NextFunction } from 'express';
import { UserRequest } from 'src/auth/types';
import { User } from '../User';
import { sanitizeUser } from '../../utils';
import { NotFound } from '../../utils/errors';

export const getCurrentUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new NotFound('Error, no user found'));
  }

  return res.json(sanitizeUser(user));
};
