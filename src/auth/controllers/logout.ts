import { NextFunction, Request, Response } from 'express';

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('access-token');
  res.clearCookie('refresh-token');

  return res.json(null);
};
