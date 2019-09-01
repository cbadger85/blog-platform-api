import { NextFunction, Request, Response } from 'express';
import uuid from 'uuid/v4';
import { User } from '../../user/User';
import { RequestResetPassword } from '../types';
import { NotFound } from '../../utils/errors';

export const requestResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { email } = req.body as RequestResetPassword;

  const user = await User.findOneAndUpdate(
    { email },
    {
      resetPasswordId: uuid(),
      resetPasswordExpiration: Date.now() + 1000 * 60 * 60 * 24,
    }
  );

  if (!user) {
    return next(new NotFound('Error, no user found'));
  }

  return res.json(null);
};
