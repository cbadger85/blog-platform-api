import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { User } from '../../user/User';
import { sanitizeUser } from '../../utils';
import { NotFound } from '../../utils/errors';

export const requestResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { resetPasswordId } = req.params as ParamsDictionary;
  const { password } = req.body; // add types
  const user = await User.findOne({ resetPasswordId });

  if (!user) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  const hashedPassword = bcrypt.hash(password, 10);

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    {
      password: hashedPassword,
    },
    { new: true }
  ).lean();

  res.json(sanitizeUser(updatedUser));
};
