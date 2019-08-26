import { IUser, ISanitizedUser } from '../user/types';

export const sanitizeUser = (user: IUser): ISanitizedUser => {
  const { password, sessionId, ...sanitizedUser } = user;

  return sanitizedUser;
};
