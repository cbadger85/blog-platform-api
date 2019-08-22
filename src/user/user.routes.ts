import Express, { Handler } from 'express';
import { createUser, getAllUsers, getUser } from './user.controller';
import { asyncErrorHandler } from '../utils/asyncErrorHandler';
import { invalidMongooseId } from '../middleware/invalidMoongooseId';
import { requireAuthentication } from '../middleware/requireAuthentication';

export const userRouter = Express.Router();

userRouter.use(requireAuthentication() as Handler);

userRouter.get(
  '/:userId',
  invalidMongooseId('userId'),
  asyncErrorHandler(getUser)
);

userRouter.get('/', asyncErrorHandler(getAllUsers));
userRouter.post('/', asyncErrorHandler(createUser));
