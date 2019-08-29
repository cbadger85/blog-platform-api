import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUserRequest } from '../../auth/types';
import { sanitizeUser, randomPassword } from '../../utils';
import { Forbidden, NotFound } from '../../utils/errors';
import { IPermissions } from '../types';
import { User } from '../User';

export const disableUser = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params as ParamsDictionary;

  if (!req.user.permissions.includes(IPermissions.USER_MANAGEMENT)) {
    return next(new Forbidden());
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { sessionId: null },
    { runValidators: true, new: true }
  );

  if (!user) {
    return next(new NotFound('Error, no user found'));
  }

  return res.json(sanitizeUser(user));
};
