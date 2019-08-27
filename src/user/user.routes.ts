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
  createUser,
  getAllUsers,
  getUser,
  changePassword,
  changeEmail,
  disableUser,
} from './controllers';

export const userRouter = Express.Router();

userRouter.use(requireAuthentication() as Handler);

userRouter.get('/', asyncErrorHandler(getAllUsers));

userRouter.post(
  '/',
  validate(createUserValidationSchema),
  asyncErrorHandler(createUser)
);

userRouter.get(
  '/:userId',
  invalidMongooseId('userId'),
  asyncErrorHandler(getUser)
);

userRouter.put(
  '/:userId/password/change',
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

userRouter.put(
  '/:userId/disable',
  invalidMongooseId('userId'),
  asyncErrorHandler(disableUser)
);
