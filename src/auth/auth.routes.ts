import Express from 'express';
import { asyncErrorHandler } from '../utils';
import { login, logout } from './controllers';

export const authRouter = Express.Router();

authRouter.post('/login', asyncErrorHandler(login));

authRouter.post('/logout', logout);
