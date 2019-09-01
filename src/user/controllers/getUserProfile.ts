import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { User } from '../User';
import { sanitizeUser } from '../../utils';
import { NotFound } from '../../utils/errors';
import { SanitizedUser } from 'src/user/types';

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { userId } = req.params as ParamsDictionary;

  const user = await User.findById(userId);

  if (!user) {
    return next(new NotFound('Error, no user found'));
  }

  const { name, bio, gravatar } = sanitizeUser(user) as Pick<
    SanitizedUser,
    'name' | 'bio' | 'gravatar'
  >;

  return res.json({ name, bio, gravatar });
};
