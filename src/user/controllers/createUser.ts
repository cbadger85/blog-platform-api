import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { IUser } from '../types';
import { User } from '../User';

export const createUser = async (req: Request, res: Response) => {
  const { password, ...user } = req.body as IUser;

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    ...user,
    password: hashedPassword,
  });

  // send user creation email

  return res.status(201).json({
    username: createdUser.username,
    name: createdUser.name,
    email: createdUser.email,
    permissions: createdUser.permissions,
  });
};
