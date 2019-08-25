import 'colors';
import { NextFunction, Request, Response } from 'express';

export const logger = () => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  console.log(
    date.toDateString().yellow,
    date.toLocaleTimeString().yellow,
    '|'.cyan,
    req.method.yellow.bold,
    req.path.yellow
  );
  next();
};
