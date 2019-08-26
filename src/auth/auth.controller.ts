import { Request, Response, NextFunction } from 'express';
import { ILoginDto } from './types';
import { User } from '../user/User';
import { Unauthorized } from '../utils/errors';
import bcrypt from 'bcryptjs';
import { createTokens } from '../utils';

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('access-token');
  res.clearCookie('refresh-token');

  return res.json(null);
};
