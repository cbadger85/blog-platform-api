import bcrypt from 'bcryptjs';
import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { UserRequest } from '../../auth/types';
import { BadRequest, Forbidden, NotFound } from '../../utils/errors';
import { sanitizeUser } from '../../utils';
import { ChangePassword } from '../types';
import { User } from '../User';

export const changePassword = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { currentPassword, password } = req.body as ChangePassword;
  const { userId } = req.params as ParamsDictionary;
  const user = await User.findById(userId);

  if (!user) {
    return next(new NotFound('Error, no user found'));
  }

  if (req.user.id !== userId) {
    return next(new Forbidden());
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    return next(new BadRequest('Invalid password'));
  }

  const newPassword = await bcrypt.hash(password, 10);

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    {
      password: newPassword,
    },
    { runValidators: true, new: true }
  );

  if (!updatedUser) {
    return next(new NotFound('Error, no user found'));
  }

  return res.json(sanitizeUser(updatedUser));
};
