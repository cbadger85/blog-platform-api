import { Request, Response } from 'express';

export const logout = (req: Request, res: Response): Response => {
  res.clearCookie('access-token');
  res.clearCookie('refresh-token');

  return res.sendStatus(204);
};
