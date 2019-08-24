import { Request, Response, NextFunction } from 'express';
import { Schema } from '@hapi/joi';
import { BadRequest } from '../utils/errors';

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const error = new BadRequest('Error, invalid input');
      console.log(result.error.details);
      error.errors = result.error.details.map(detail => detail.message);
      return next(error);
    }

    return next();
  };
};
