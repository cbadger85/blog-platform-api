import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../utils/errors';
import { Error as MongooseError } from 'mongoose';
import { NotFound } from '../utils/errors';

const resourceNotFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new NotFound('Error, resource not found');
  return next(err);
};

const logError = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  return next(err);
};

const mongooseValidationError = (
  err: MongooseError.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof MongooseError.ValidationError)) {
    return next(err);
  }
  const errors = Object.keys(err.errors);

  res.status(400).json({
    statusCode: 400,
    name: err.name,
    message: errors.map(name => err.errors[name].message),
  });
};

const listErrorsHandler = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.errors) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    name: err.name,
    message: err.errors,
  });
};

const generalErrorHandler = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    name: err.name,
    message: [err.message],
  });
};

export const errorHandlers = [
  resourceNotFound,
  logError,
  mongooseValidationError,
  listErrorsHandler,
  generalErrorHandler,
];
