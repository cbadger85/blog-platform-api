import { Request, Response } from 'express';
import { ICreateUser } from '../types';
import { User } from '../User';

export const createUser = async (req: Request, res: Response) => {
  const user = req.body as ICreateUser;

  const createdUser = await User.create(user);

  // send user creation email

  return res.status(201).json({
    username: createdUser.username,
    name: createdUser.name,
    email: createdUser.email,
    permissions: createdUser.permissions,
  });
};
