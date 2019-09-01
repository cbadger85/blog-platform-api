import { Request, Response, NextFunction, Handler } from 'express';

export const asyncErrorHandler = (fn: Handler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    return fn(req, res, next).catch(next);
  };
};
