import { Request } from 'express';
import { AccessToken } from './AccessToken';

export interface UserRequest extends Request {
  user: AccessToken;
}
