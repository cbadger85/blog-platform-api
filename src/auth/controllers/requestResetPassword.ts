import { NextFunction, Request, Response } from 'express';
import uuid from 'uuid/v4';
import { User } from '../../user/User';
import { IRequestResetPassword } from '../types';

export const requestResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body as IRequestResetPassword;

  await User.findOneAndUpdate(
    { email },
    {
      resetPasswordId: uuid(),
      resetPasswordExpiration: Date.now() + 1000 * 60 * 60 * 24,
    }
  );

  return res.json(null);
};
