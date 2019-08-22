import { Request } from 'express';
import { IAccessToken } from './IAccessToken';

export interface IUserRequest extends Request {
  user: IAccessToken;
}
