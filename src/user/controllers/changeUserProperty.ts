import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUserRequest } from '../../auth/types';
import { sanitizeUser } from '../../utils';
import { Forbidden, NotFound } from '../../utils/errors';
import { IPermisssionsAccessLevel } from '../types';
import { User } from '../User';

export const changeUserProperty = (prop: string) => async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const value = req.body[prop];
  const { userId } = req.params as ParamsDictionary;

  if (
    req.user.id !== userId ||
    !req.user.permissions.accessLevel.includes(
      IPermisssionsAccessLevel.USER_MANAGEMENT
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
