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

userRouter.get(
  '/',
  requireAuthentication() as Handler,
  asyncErrorHandler(getAllUsers as Handler)
);

userRouter.post(
  '/',
  requireAuthentication() as Handler,
  validate({ body: createUserValidationSchema }),
  asyncErrorHandler(createUser)
);

userRouter.get(
  '/current',
  requireAuthentication() as Handler,
  requireAuthentication() as Handler,
  asyncErrorHandler(getCurrentUser as Handler)
);

userRouter.get(
  '/:userId',
  requireAuthentication() as Handler,
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(getUser as Handler)
);

userRouter.put(
  '/:userId/password/change',
  requireAuthentication() as Handler,
  validate({
    body: changePasswordValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changePassword as Handler)
);

userRouter.put(
  '/:userId/email',
  requireAuthentication() as Handler,
  validate({
    body: changeEmailValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeUserProperty('email') as Handler)
);

userRouter.put(
  '/:userId/bio',
  requireAuthentication() as Handler,
  validate({
    body: changeBioValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeUserProperty('bio') as Handler)
);

userRouter.put(
  '/:userId/disable',
  requireAuthentication() as Handler,
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(disableUser as Handler)
);

userRouter.put(
  '/:userId/disable-refresh-token',
  requireAuthentication() as Handler,
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(disableRefreshToken as Handler)
);

userRouter.get(
  '/:userId/reset-password-id',
  requireAuthentication() as Handler,
  validate({ urlParams: userIdParamsValidation }),
  asyncErrorHandler(getResetPasswordId as Handler)
);

userRouter.put(
  '/:userId/username',
  requireAuthentication() as Handler,
  validate({
    body: changeUsernameValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeUserPropertyAdmin('username') as Handler)
);

userRouter.put(
  '/:userId/name',
  requireAuthentication() as Handler,
  validate({
    body: changeNameValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeUserPropertyAdmin('name') as Handler)
);
