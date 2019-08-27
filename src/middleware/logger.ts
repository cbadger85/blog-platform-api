import 'colors';
import colors from 'colors/safe';
import { NextFunction, Request, Response } from 'express';
import { asyncFiglet } from '../utils';
import { randomChar } from '../utils';

export const logger = () => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  const logFiglet = await asyncFiglet(randomChar(), { font: 'Efti Wall' });
  console.log(colors.yellow(logFiglet as string));
  console.log(
    date.toDateString().yellow,
    date.toLocaleTimeString().yellow,
    '|'.cyan,
    req.method.yellow.bold,
    req.path.yellow
  );
  next();
};
