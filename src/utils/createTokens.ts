import jwt from 'jsonwebtoken';
import { IUserModel } from '../user/User';

interface createdTokens {
  accessToken: string;
  refreshToken: string;
}

export const createTokens = (user: IUserModel): createdTokens => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      name: user.name,
      roles: user.roles,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '10m',
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
      sessionId: user.sessionId,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '24h',
    }
  );

  return { accessToken, refreshToken };
};
