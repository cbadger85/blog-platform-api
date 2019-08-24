import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BadRequest } from '../utils/errors';
import { ParamsDictionary } from 'express-serve-static-core';

export const invalidMongooseId = (...args: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as ParamsDictionary;

    const errors = args
      .map(id => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return undefined;
        }

        return `'${id}' is an invalid ID`;
      })
      .filter(id => id);

    console.log(errors);

    if (errors.length) {
      const error = new BadRequest('Error, invalid ID(s)');
      error.errors = errors as string[];
      return next(error);
    }

    return next();
  };
};
