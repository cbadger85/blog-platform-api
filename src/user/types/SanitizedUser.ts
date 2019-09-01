import { Permissions } from './Permissions';

export interface SanitizedUser {
  id: string;
  name: string;
  username: string;
  email: string;
  permissions: Permissions;
  sessionId: string;
  bio: string;
  gravatar: string;
}
