import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../user/User';
import { createTokens } from '../utils/createTokens';
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
        const accessTokenData = jwt.verify(
          accessToken,
          'secret'
        ) as IAccessToken;

        req.user = {
          name: accessTokenData.name,
          id: accessTokenData.id,
          roles: accessTokenData.roles,
        };

        return next();
      } catch {}
    }

    try {
      const refreshTokenData = jwt.verify(
        refreshToken,
        'super-secret'
      ) as IRefreshToken;

      const user = await User.findById(refreshTokenData.id);

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
        name: user.name,
        id: user.id,
        roles: user.roles,
      };

      return next();
    } catch (e) {
      return next();
    }
  };
};
