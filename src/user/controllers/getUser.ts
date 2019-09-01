import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { UserRequest } from 'src/auth/types';
import { sanitizeUser } from '../../utils';
import { Forbidden, NotFound } from '../../utils/errors';
import { PermisssionsAccessLevel } from '../types';
import { User } from '../User';

export const getUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { userId } = req.params as ParamsDictionary;

  if (
    !req.user.permissions.accessLevel.includes(
      PermisssionsAccessLevel.USER_MANAGEMENT
    )
  ) {
    return next(new Forbidden());
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new NotFound('Error, no user found'));
  }

  return res.json(sanitizeUser(user));
};
