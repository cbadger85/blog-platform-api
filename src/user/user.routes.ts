import Express, { Handler } from 'express';
import { createUser, getAllUsers, getUser } from './user.controller';
import { asyncErrorHandler } from '../utils';
import { invalidMongooseId } from '../middleware/invalidMoongooseId';
import { requireAuthentication } from '../middleware/requireAuthentication';
import { validate } from '../middleware/validate';
import { createUserValidationSchema } from '../user/validationSchemas';

export const userRouter = Express.Router();

userRouter.use(requireAuthentication() as Handler);

userRouter.get(
  '/:userId',
  invalidMongooseId('userId'),
  asyncErrorHandler(getUser)
);

userRouter.get('/', asyncErrorHandler(getAllUsers));
userRouter.post(
  '/',
  validate(createUserValidationSchema),
  asyncErrorHandler(createUser)
);
