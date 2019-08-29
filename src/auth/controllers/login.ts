import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../user/User';
import { createTokens, sanitizeUser } from '../../utils';
import { Unauthorized } from '../../utils/errors';
import { ILogin } from '../types';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as ILogin;

  const user = await User.findOne({ username });

  if (!user || !user.sessionId) {
    const error = new Unauthorized('Error, invalid credentials');
    return next(error);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Unauthorized('Error, invalid credentials');
    return next(error);
  }

  const { accessToken, refreshToken } = createTokens(user);

  res.cookie('access-token', accessToken, {
    expires: new Date(Date.now() + 1000 * 60 * 10),
    httpOnly: true,
  });

  res.cookie('refresh-token', refreshToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
  });

  return res.json(sanitizeUser(user));
};
