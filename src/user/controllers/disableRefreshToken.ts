import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import uuid from 'uuid/v4';
import { UserRequest } from '../../auth/types';
import { sanitizeUser } from '../../utils';
import { Forbidden, NotFound } from '../../utils/errors';
import { PermisssionsAccessLevel } from '../types';
import { User } from '../User';

export const disableRefreshToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { userId } = req.params as ParamsDictionary;

  if (
    !req.user.permissions.accessLevel.includes(
      PermisssionsAccessLevel.USER_MANAGEMENT
    )
  ) {
    return next(new Forbidden());
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { sessionId: uuid() },
    { runValidators: true, new: true }
  );

  if (!user) {
    return next(new NotFound('Error, user not found'));
  }

  return res.json(sanitizeUser(user));
};
