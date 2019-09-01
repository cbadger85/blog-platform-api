import { NextFunction, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUserRequest } from '../../auth/types';
import { Forbidden, NotFound } from '../../utils/errors';
import { IPermisssionsAccessLevel } from '../types';
import { User } from '../User';

export const getResetPasswordId = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params as ParamsDictionary;

  if (
    !req.user.permissions.accessLevel.includes(
      IPermisssionsAccessLevel.USER_MANAGEMENT
    )
  ) {
    return next(new Forbidden());
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new NotFound('Error, user not found'));
  }

  return res.json({
    id: user.id,
    resetPasswordId: user.resetPasswordId,
    resetPasswordExpiratio: user.resetPasswordExpiration,
  });
};
