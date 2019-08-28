import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationErrorItem, ObjectSchema } from '@hapi/joi';
import { BadRequest } from '../utils/errors';

export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bodyResult =
      schemas.body && schemas.body.validate(req.body, { abortEarly: false });
    const urlParamsResult =
      schemas.urlParams &&
      schemas.urlParams.validate(req.params, {
        abortEarly: false,
      });
    const searchParamsResult =
      schemas.searchParams &&
      schemas.searchParams.validate(req.query, {
        abortEarly: false,
      });

    let errors: ValidationErrorItem[] = [];

    if (bodyResult && bodyResult.error) {
      errors = [...errors, ...bodyResult.error.details];
    }

    if (urlParamsResult && urlParamsResult.error) {
      errors = [...errors, ...urlParamsResult.error.details];
    }

    if (searchParamsResult && searchParamsResult.error) {
      errors = [...errors, ...searchParamsResult.error.details];
    }

    if (errors.length) {
      console.log(errors);
      const error = new BadRequest('Error, invalid input');
      error.errors = errors.map(detail => detail.message);
      return next(error);
    }

    return next();
  };
};

interface ValidationSchemas {
  body?: ObjectSchema;
  urlParams?: ObjectSchema;
  searchParams?: ObjectSchema;
}
