import { NextFunction, Response } from 'express';
import { UserRequest } from '../../auth/types';
import { sanitizeUser } from '../../utils';
import { Forbidden } from '../../utils/errors';
import { PermisssionsAccessLevel } from '../types';
import { User } from '../User';

export const getAllUsers = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  if (
    !req.user.permissions.accessLevel.includes(
      PermisssionsAccessLevel.USER_MANAGEMENT
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
