import { Request, Response } from 'express';
import { ICreateUser } from '../types';
import { User } from '../User';
import { randomPassword, sanitizeUser } from '../../utils';

export const createUser = async (req: Request, res: Response) => {
  const user = req.body as ICreateUser;

  const password = await randomPassword();

  const createdUser = await User.create({ ...user, password });

  return res.status(201).json(sanitizeUser(createdUser));
};
