import Express, { Handler } from 'express';
import { invalidMongooseId } from '../middleware/invalidMoongooseId';
import { requireAuthentication } from '../middleware/requireAuthentication';
import { validate } from '../middleware/validate';
import {
  changePasswordValidationSchema,
  createUserValidationSchema,
  changeEmailValidationSchema,
} from '../user/validationSchemas';
import {} from '../user/validationSchemas/changePasswordValidationSchema';
import { asyncErrorHandler } from '../utils';
import {
  changePassword,
  createUser,
  getAllUsers,
  getUser,
  changeEmail,
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
