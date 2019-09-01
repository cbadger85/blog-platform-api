import { NextFunction, Response } from 'express';
import { IUserRequest } from '../../auth/types';
import { sanitizeUser } from '../../utils';
import { Forbidden } from '../../utils/errors';
import { IPermisssionsAccessLevel } from '../types';
import { User } from '../User';

export const getAllUsers = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.user.permissions.accessLevel.includes(
      IPermisssionsAccessLevel.USER_MANAGEMENT
    )
  ) {
    return next(new Forbidden());
  }

  const users = await User.find();

  return res.json(
    users.map(user => {
      return sanitizeUser(user);
    })
  );
};
