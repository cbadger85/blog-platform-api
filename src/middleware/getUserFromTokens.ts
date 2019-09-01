import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../user/User';
import { createTokens } from '../utils';
import { IAccessToken, IRefreshToken, IUserRequest } from '../auth/types';

export const getUserFromTokens = () => {
  return async (req: IUserRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies['access-token'];
    const refreshToken = req.cookies['refresh-token'];

    if ((!accessToken && !refreshToken) || !refreshToken) {
      return next();
    }

    if (accessToken) {
      try {
        const accessTokenData = jwt.verify(accessToken, process.env
          .ACCESS_TOKEN_SECRET as string) as IAccessToken;

        req.user = {
          id: accessTokenData.id,
          permissions: { ...accessTokenData.permissions },
        } as IAccessToken;

        return next();
      } catch (e) {}
    }

    try {
      const refreshTokenData = jwt.verify(refreshToken, process.env
        .REFRESH_TOKEN_SECRET as string) as IRefreshToken;

      const user = await User.findById(refreshTokenData.id).lean();

      if (!user) {
        return next();
      }

      if (user.sessionId !== refreshTokenData.sessionId) {
        res.clearCookie('access-token');
        res.clearCookie('refresh-token');
        return next();
      }

      const { accessToken, refreshToken: newRefreshToken } = createTokens(user);

      res.cookie('access-token', accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 10),
        httpOnly: true,
      });

      res.cookie('refresh-token', newRefreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,
      });

      req.user = {
        id: user.id,
        permissions: { ...user.permissions },
      } as IAccessToken;

      return next();
    } catch (e) {
      return next();
    }
  };
};
