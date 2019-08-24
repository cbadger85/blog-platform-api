import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { NotFound, BadRequest } from '../utils/errors';
import { IUser } from './types';
import { User } from './User';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUserRequest } from '../auth/types';
import { IChangePasswordBody } from 'src/user/types/IChangePasswordBody';

export const createUser = async (req: Request, res: Response) => {
  const { password, ...user } = req.body as IUser;

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    ...user,
    password: hashedPassword,
  });

  return res.status(201).json({
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

  const user = await User.findById(userId).lean();

  if (!user) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  const { password, sessionId, ...sanitizedUser } = user;

  return res.json(sanitizedUser);
};

export const changePassword = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { currentPassword, password } = req.body as IChangePasswordBody;
  const user = await User.findById(req.user.id);
  const { userId } = req.params as ParamsDictionary;

  if (!user || user.id !== userId) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    const error = new BadRequest('Invalid password');
    return next(error);
  }

  const newPassword = await bcrypt.hash(password, 10);

  const updatedUser = await User.findByIdAndUpdate(user.id, {
    password: newPassword,
  }).lean();

  const { password: _, sessionId, ...sanitizedUser } = updatedUser;

  res.json(sanitizedUser);
};
