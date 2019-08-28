import { IPermissions } from './IPermissions';

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  permissions: IPermissions[];
  sessionId: string;
  resetPasswordId: string;
  resetPasswordExpiration: Date;
}
