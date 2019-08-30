import { NextFunction, Request, Response } from 'express';
import { BaseError, Unauthorized, NotFound, Forbidden } from '../utils/errors';
import { Error as MongooseError } from 'mongoose';
import colors from 'colors/safe';
import { asyncFiglet } from '../utils';

const resourceNotFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send(`
    <html>
      <head>
        <title>Not Found</title>
      </head>
      <body>
        <h1>404 - Not Found</h1>
        <p>The resource you're looking for cannot be found</p>
      </body>
    </html>
  `);
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

const showUnauthorizedPage = async (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof Unauthorized)) {
    return next(err);
  }

  return res.status(401).send(`
  <html>
    <head>
      <title>Unauthorized</title>
    </head>
    <body>
      <h1>401 - Unauthorized</h1>
      <p>You are unauthorized to view this resource</p>
    </body>
  </html>
`);
};

const showForbiddenPage = async (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof Forbidden)) {
    return next(err);
  }

  return res.status(403).send(`
  <html>
    <head>
      <title>Forbidden</title>
    </head>
    <body>
      <h1>403 - Forbidden</h1>
      <p>You are forbidden from this resource</p>
    </body>
  </html>
`);
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
  showUnauthorizedPage,
  showForbiddenPage,
  mongooseValidationError,
  listErrorsHandler,
  generalErrorHandler,
];
