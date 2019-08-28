import Express, { Handler } from 'express';
import { requireAuthentication, validate } from '../middleware';
import { asyncErrorHandler } from '../utils';
import {
  changeEmail,
  changePassword,
  createUser,
  disableUser,
  getAllUsers,
  getUser,
} from './controllers';
import {
  changeEmailValidationSchema,
  changePasswordValidationSchema,
  createUserValidationSchema,
} from './validationSchemas/body';
import { userIdParamsValidation } from './validationSchemas/urlParams';

export const userRouter = Express.Router();

userRouter.use(requireAuthentication() as Handler);

userRouter.get('/', asyncErrorHandler(getAllUsers));

userRouter.post(
  '/',
  validate({ body: createUserValidationSchema }),
  asyncErrorHandler(createUser)
);

userRouter.get(
  '/:userId',
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(getUser)
);

userRouter.put(
  '/:userId/password/change',
  validate({
    body: changePasswordValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changePassword)
);

userRouter.put(
  '/:userId/email',
  validate({
    body: changeEmailValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeEmail)
);

userRouter.put(
  '/:userId/disable',
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(disableUser)
);
