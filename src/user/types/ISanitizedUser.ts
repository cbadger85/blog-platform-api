import { IPermissions } from './IPermissions';

export interface ISanitizedUser {
  id: string;
  name: string;
  username: string;
  email: string;
  permissions: IPermissions[];
}
