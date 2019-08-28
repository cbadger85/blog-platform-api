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
    const error = new Forbidden();
    return next(error);
  }

  const user = await User.findById(userId);

  if (!user) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  const password = await randomPassword();

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { password },
    { new: true }
  ).lean();

  return res.json(sanitizeUser(updatedUser));
};
