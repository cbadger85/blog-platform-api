import { Response } from 'express';
import { UserRequest } from '../../auth/types';
import { randomPassword, sanitizeUser } from '../../utils';
import { CreateUser, PermisssionsAccessLevel } from '../types';
import { User } from '../User';
import { NextFunction } from 'connect';
import { Forbidden } from '../../utils/errors';

export const createUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const user = req.body as CreateUser;

  if (
    !req.user.permissions.accessLevel.includes(
      PermisssionsAccessLevel.USER_MANAGEMENT
    )
  ) {
    return next(new Forbidden());
  }

  const password = await randomPassword();

  const createdUser = await User.create({ ...user, password });

  return res.status(201).json(sanitizeUser(createdUser));
};
