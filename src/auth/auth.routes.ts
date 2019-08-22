import Express from 'express';
import { asyncErrorHandler } from '../utils/asyncErrorHandler';
import { login, logout } from './auth.controller';

export const authRouter = Express.Router();

authRouter.post('/login', asyncErrorHandler(login));

authRouter.post('/logout', logout);
