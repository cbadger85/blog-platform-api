import { Permissions } from 'src/user/types';

export interface AccessToken {
  id: string;
  permissions: Permissions;
}
