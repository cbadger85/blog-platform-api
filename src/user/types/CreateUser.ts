import { Permissions } from './Permissions';

export interface CreateUser {
  name: string;
  username: string;
  email: string;
  permissions: Permissions;
}
