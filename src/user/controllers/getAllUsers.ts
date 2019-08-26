import { Request, Response } from 'express';
import { sanitizeUser } from '../../utils';
import { IUser } from '../types';
import { User } from '../User';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = (await User.find().lean()) as IUser[];

  return res.json(
    users.map(user => {
      return sanitizeUser(user);
    })
  );
};
