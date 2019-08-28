import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { sanitizeUser } from 'src/utils';
import uuid from 'uuid/v4';
import { User } from '../../user/User';
import { NotFound } from '../../utils/errors';
import { IUserRequest } from '../types';

export const requestResetPassword = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body; // type this
  const user = await User.findOne({ email });

  if (!user) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  const updatedUser = await User.findByIdAndUpdate(user.id, {
    resetPasswordId: uuid(),
    resetPasswordExpiration: Date.now() + 1000 * 60 * 60 * 24,
  }).lean();

  res.json(sanitizeUser(updatedUser));
};
