import { NextFunction, Response } from 'express';
import { sanitizeUser, randomPassword } from '../../utils';
import uuid from 'uuid/v4';
import { User } from '../../user/User';
import { NotFound } from '../../utils/errors';
import { IUserRequest, IRequestResetPassword } from '../types';

export const requestResetPassword = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body as IRequestResetPassword;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  const password = await randomPassword();

  const updatedUser = await User.findByIdAndUpdate(user.id, {
    password,
    resetPasswordId: uuid(),
    resetPasswordExpiration: Date.now() + 1000 * 60 * 60 * 24,
  }).lean();

  return res.json(sanitizeUser(updatedUser));
};
