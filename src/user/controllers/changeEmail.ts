import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUserRequest } from '../../auth/types';
import { Forbidden, NotFound } from '../../utils/errors';
import { sanitizeUser } from '../../utils';
import { IChangeEmail, IPermissions } from '../types';
import { User } from '../User';

export const changeEmail = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body as IChangeEmail;
  const { userId } = req.params as ParamsDictionary;
  const user = await User.findById(userId);

  if (!user) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  if (
    user.id !== userId ||
    !req.user.permissions.includes(IPermissions.USER_MANAGEMENT)
  ) {
    const error = new Forbidden();
    return next(error);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { email },
    { runValidators: true, context: 'query', new: true }
  ).lean();

  return res.json(sanitizeUser(updatedUser));
};
