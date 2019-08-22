import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { NotFound } from '../errors';
import { IUser } from './types';
import { User } from './User';
import { ParamsDictionary } from 'express-serve-static-core';

export const createUser = async (req: Request, res: Response) => {
  const { password, ...user } = req.body as IUser;

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    ...user,
    password: hashedPassword,
  });

  return res.json({
    username: createdUser.username,
    name: createdUser.name,
    email: createdUser.email,
    permissions: createdUser.permissions,
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = (await User.find().lean()) as IUser[];

  return res.json(
    users.map(user => {
      const { password, sessionId, ...sanitizedUser } = user;

      return sanitizedUser;
    })
  );
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params as ParamsDictionary;

  const user = await User.findById(userId);

  if (!user) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  return res.json(user);
};
