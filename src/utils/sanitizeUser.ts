import { ISanitizedUser } from '../user/types';
import { IUserModel } from '../user/User';

export const sanitizeUser = (user: IUserModel): ISanitizedUser => {
  const {
    id,
    name,
    email,
    username,
    permissions,
    sessionId,
    bio,
    gravatar,
  } = user;

  return { id, name, email, username, permissions, sessionId, bio, gravatar };
};
