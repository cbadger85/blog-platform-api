import { Response, NextFunction } from 'express';
import { IUserRequest } from '../../auth/types';
import { ParamsDictionary } from 'express-serve-static-core';
import { IPermissions } from '../types';
import { Forbidden, NotFound } from '../../utils/errors';
import { User } from '../User';

export const getResetPasswordId = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params as ParamsDictionary;

  if (!req.user.permissions.includes(IPermissions.USER_MANAGEMENT)) {
    const error = new Forbidden();
    return next(error);
  }

  const user = await User.findById(userId);

  if (!user) {
    const error = new NotFound('Error, user not found');
    return next(error);
  }

  return res.json({
    id: user.id,
    resetPasswordId: user.resetPasswordId,
    resetPasswordExpiratio: user.resetPasswordExpiration,
  });
};
