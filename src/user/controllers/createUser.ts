import { Response } from 'express';
import { IUserRequest } from '../../auth/types';
import { randomPassword, sanitizeUser } from '../../utils';
import { ICreateUser, IPermisssionsAccessLevel } from '../types';
import { User } from '../User';
import { NextFunction } from 'connect';
import { Forbidden } from '../../utils/errors';

export const createUser = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.body as ICreateUser;

  if (
    !req.user.permissions.accessLevel.includes(
      IPermisssionsAccessLevel.USER_MANAGEMENT
    )
  ) {
    return next(new Forbidden());
  }

  const password = await randomPassword();

  const createdUser = await User.create({ ...user, password });

  return res.status(201).json(sanitizeUser(createdUser));
};
