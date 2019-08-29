import { NextFunction, Request, Response } from 'express';
import uuid from 'uuid/v4';
import { User } from '../../user/User';
import { NotFound } from '../../utils/errors';
import { IRequestResetPassword } from '../types';

export const requestResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body as IRequestResetPassword;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new NotFound('Error, no user found'));
  }

  const updatedUser = await User.findByIdAndUpdate(user.id, {
    resetPasswordId: uuid(),
    resetPasswordExpiration: Date.now() + 1000 * 60 * 60 * 24,
  }).lean();

  if (!updatedUser) {
    if (!user) {
      return next(new NotFound('Error, no user found'));
    }
  }

  return res.json(null);
};
