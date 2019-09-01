import { SanitizedUser } from '../user/types';
import { UserModel } from '../user/User';

export const sanitizeUser = (user: UserModel): SanitizedUser => {
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
