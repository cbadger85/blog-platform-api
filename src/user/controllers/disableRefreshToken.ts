import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import uuid from 'uuid/v4';
import { IUserRequest } from '../../auth/types';
import { sanitizeUser } from '../../utils';
import { Forbidden, NotFound } from '../../utils/errors';
import { IPermissions } from '../types';
import { User } from '../User';

export const disableRefreshToken = async (
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
    const error = new NotFound('Error, user not found');
    return next(error);
  }

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    { sessionId: uuid() },
    { new: true }
  );

  if (!updatedUser) {
    const error = new NotFound('Error, user not found');
    return next(error);
  }

  return res.json(sanitizeUser(updatedUser));
};
