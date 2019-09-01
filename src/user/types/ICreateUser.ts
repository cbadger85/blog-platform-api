import { IPermissions } from './IPermissions';

export interface ICreateUser {
  name: string;
  username: string;
  email: string;
  permissions: IPermissions;
}
