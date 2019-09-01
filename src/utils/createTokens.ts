import jwt from 'jsonwebtoken';
import { UserModel } from '../user/User';

interface CreatedTokens {
  accessToken: string;
  refreshToken: string;
}

export const createTokens = (user: UserModel): CreatedTokens => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      name: user.name,
      permissions: user.permissions,
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
