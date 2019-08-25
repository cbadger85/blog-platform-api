import Express, { Handler } from 'express';
import {
  invalidMongooseId,
  requireAuthentication,
  validate,
} from '../middleware';
import {
  changeEmailValidationSchema,
  changePasswordValidationSchema,
  createUserValidationSchema,
} from '../user/validationSchemas';
import { asyncErrorHandler } from '../utils';
import {
  changeEmail,
  changePassword,
  createUser,
  getAllUsers,
  getUser,
} from './user.controller';

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
userRouter.put(
  '/:userId/password',
  invalidMongooseId('userId'),
  validate(changePasswordValidationSchema),
  asyncErrorHandler(changePassword)
);

userRouter.put(
  '/:userId/email',
  invalidMongooseId('userId'),
  validate(changeEmailValidationSchema),
  asyncErrorHandler(changeEmail)
);
