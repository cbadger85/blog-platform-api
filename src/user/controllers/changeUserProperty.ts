import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { UserRequest } from '../../auth/types';
import { sanitizeUser } from '../../utils';
import { Forbidden, NotFound } from '../../utils/errors';
import { PermisssionsAccessLevel } from '../types';
import { User } from '../User';

export const changeUserProperty = (prop: string) => async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const value = req.body[prop];
  const { userId } = req.params as ParamsDictionary;

  if (
    req.user.id !== userId ||
    !req.user.permissions.accessLevel.includes(
      PermisssionsAccessLevel.USER_MANAGEMENT
    )
  ) {
    return next(new Forbidden());
  }

  if (!User.schema.path(prop)) {
    return next(new Error('Error, no key found'));
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { [prop]: value },
    { runValidators: true, context: 'query', new: true }
  );

  if (!user) {
    return next(new NotFound('Error, no user found'));
  }

  return res.json(sanitizeUser(user));
};
