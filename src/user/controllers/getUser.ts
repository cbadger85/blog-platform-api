import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { NotFound } from '../../utils/errors';
import { sanitizeUser } from '../../utils';
import { User } from '../User';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params as ParamsDictionary;

  const user = await User.findById(userId).lean();

  if (!user) {
    const error = new NotFound('Error, no user found');
    return next(error);
  }

  return res.json(sanitizeUser(user));
};
