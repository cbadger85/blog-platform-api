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
  getResetPasswordId,
  disableRefreshToken,
  getCurrentUser,
  changeUsername,
  changeBio,
  changeName,
} from './controllers';
import {
  changeEmailValidationSchema,
  changePasswordValidationSchema,
  createUserValidationSchema,
  changeUsernameValidationSchema,
  changeBioValidationSchema,
  changeNameValidationSchema,
} from './validationSchemas/body';
import { userIdParamsValidation } from './validationSchemas/urlParams';

export const userRouter = Express.Router();

userRouter.use(requireAuthentication() as Handler);

userRouter.get('/', asyncErrorHandler(getAllUsers as Handler));

userRouter.post(
  '/',
  validate({ body: createUserValidationSchema }),
  asyncErrorHandler(createUser)
);

userRouter.get('/current-user', asyncErrorHandler(getCurrentUser as Handler));

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
  asyncErrorHandler(changeEmail as Handler)
);

userRouter.put(
  '/:userId/bio',
  validate({
    body: changeBioValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeBio as Handler)
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
  asyncErrorHandler(changeUsername as Handler)
);

userRouter.put(
  '/:userId/name',
  validate({
    body: changeNameValidationSchema,
    urlParams: userIdParamsValidation,
  }),
  asyncErrorHandler(changeName as Handler)
);
