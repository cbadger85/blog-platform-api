import bcrypt from 'bcryptjs';
import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUserRequest } from '../../auth/types';
import { BadRequest, Forbidden, NotFound } from '../../utils/errors';
import { sanitizeUser } from '../../utils';
import { IChangePassword } from '../types';
import { User } from '../User';

export const changePassword = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { currentPassword, password } = req.body as IChangePassword;
  const { userId } = req.params as ParamsDictionary;
  const user = await User.findById(userId);

  if (!user) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  if (user.id !== userId) {
    const error = new Forbidden();
    return next(error);
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    const error = new BadRequest('Invalid password');
    return next(error);
  }

  const newPassword = await bcrypt.hash(password, 10);

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    {
      password: newPassword,
    },
    { new: true }
  ).lean();

  res.json(sanitizeUser(updatedUser));
};
