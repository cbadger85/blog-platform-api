import { IPermissions } from 'src/user/types';

export interface IAccessToken {
  id: string;
  permissions: IPermissions;
}
