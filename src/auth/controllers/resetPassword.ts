import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { User } from '../../user/User';
import { sanitizeUser } from '../../utils';
import { NotFound } from '../../utils/errors';
import { IResetPassword } from '../types';

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { resetPasswordId } = req.params as ParamsDictionary;
  const { password } = req.body as IResetPassword;

  const user = await User.findOne({ resetPasswordId });

  if (!user || new Date() > user.resetPasswordExpiration) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    {
      password: hashedPassword,
    },
    { new: true }
  );

  if (!updatedUser) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  return res.json(null);
};
