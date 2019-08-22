import { Request, Response, NextFunction } from 'express';
import { ILoginDto } from './types';
import { User } from '../user/User';
import { Unauthorized } from '../errors/Unauthorized';
import bcrypt from 'bcryptjs';
import { createTokens } from '../utils/createTokens';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as ILoginDto;

  const user = await User.findOne({ username });

  if (!user) {
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

  return res.json(user);
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('access-token');
  res.clearCookie('refresh-token');

  return res.json(null);
};
