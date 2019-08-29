import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../utils/errors';
import { Error as MongooseError } from 'mongoose';
import { NotFound } from '../utils/errors';
import colors from 'colors/safe';
import { asyncFiglet } from '../utils';

const resourceNotFound = (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFound('Error, resource not found'));
};

const logError = async (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorFiglet = await asyncFiglet('Error', { font: 'Slant' });

  console.error(colors.red((errorFiglet as unknown) as string));
  console.error(colors.red((err as unknown) as string));

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
