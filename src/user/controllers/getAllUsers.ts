import { NextFunction, Response } from 'express';
import { IUserRequest } from '../../auth/types';
import { Forbidden } from '../../utils/errors';
import { IPermissions, IUser } from '../types';
import { User } from '../User';

export const getAllUsers = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.permissions.includes(IPermissions.USER_MANAGEMENT)) {
    const error = new Forbidden();
    return next(error);
  }

  const users = (await User.find().lean()) as IUser[];

  return res.json(
    users.map(user => {
      const { password, ...sanitizedUser } = user;
      return sanitizedUser;
    })
  );
};
