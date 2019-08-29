import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUserRequest } from 'src/auth/types';
import { sanitizeUser } from '../../utils';
import { NotFound, Forbidden } from '../../utils/errors';
import { User } from '../User';
import { IPermissions } from '../types';

export const getUser = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params as ParamsDictionary;

  if (!req.user.permissions.includes(IPermissions.USER_MANAGEMENT)) {
    return next(new Forbidden());
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new NotFound('Error, no user found'));
  }

  return res.json(sanitizeUser(user));
};
