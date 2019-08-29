import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IChangeBio } from 'src/user/types/IChangeBio';
import { IUserRequest } from '../../auth/types';
import { sanitizeUser } from '../../utils';
import { Forbidden, NotFound } from '../../utils/errors';
import { IPermissions } from '../types';
import { User } from '../User';

export const changeBio = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { bio } = req.body as IChangeBio;
  const { userId } = req.params as ParamsDictionary;
  const user = await User.findById(userId);

  if (!user) {
    return next(new NotFound('Error, no user found'));
  }

  if (
    user.id !== userId ||
    !req.user.permissions.includes(IPermissions.USER_MANAGEMENT)
  ) {
    return next(new Forbidden());
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { bio },
    { runValidators: true, context: 'query', new: true }
  );

  if (!updatedUser) {
    return next(new NotFound('Error, no user found'));
  }

  return res.json(sanitizeUser(updatedUser));
};
