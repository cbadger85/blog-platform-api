import Express, { Handler } from 'express';
import { requireAuthentication, validate } from '../middleware';
import { asyncErrorHandler } from '../utils';
import {
  changePassword,
  changeUserProperty,
  changeUserPropertyAdmin,
  createUser,
  disableRefreshToken,
  disableUser,
  getAllUsers,
  getCurrentUser,
  getResetPasswordId,
  getUser,
  getUserProfile,
} from './controllers';
import {
  changeBioValidationSchema,
  changeEmailValidationSchema,
  changeNameValidationSchema,
  changePasswordValidationSchema,
  changeUsernameValidationSchema,
  createUserValidationSchema,
} from './validationSchemas/body';
import { userIdParamsValidation } from './validationSchemas/urlParams';

export const userRouter = Express.Router();

userRouter.get(
  '/:userId/profile',
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(getUserProfile as Handler)
);

userRouter.use(requireAuthentication() as Handler);

userRouter.get('/', asyncErrorHandler(getAllUsers as Handler));

userRouter.post(
  '/',
  validate({ body: createUserValidationSchema }),
  asyncErrorHandler(createUser)
);

userRouter.get('/current', asyncErrorHandler(getCurrentUser as Handler));

userRouter.get(
  '/:userId',
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(getUser as Handler)
);

userRouter.put(
  '/:userId/password/change',
  validate({
    body: changePasswordValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changePassword as Handler)
);

userRouter.put(
  '/:userId/email',
  validate({
    body: changeEmailValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeUserProperty('email') as Handler)
);

userRouter.put(
  '/:userId/bio',
  validate({
    body: changeBioValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeUserProperty('bio') as Handler)
);

userRouter.put(
  '/:userId/disable',
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(disableUser as Handler)
);

userRouter.put(
  '/:userId/disable-refresh-token',
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(disableRefreshToken as Handler)
);

userRouter.get(
  '/:userId/reset-password-id',
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(getResetPasswordId as Handler)
);

userRouter.put(
  '/:userId/username',
  validate({
    body: changeUsernameValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeUserPropertyAdmin('username') as Handler)
);

userRouter.put(
  '/:userId/name',
  validate({
    body: changeNameValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeUserPropertyAdmin('name') as Handler)
);
