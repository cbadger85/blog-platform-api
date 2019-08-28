import Express from 'express';
import { validate } from '../middleware';
import { asyncErrorHandler } from '../utils';
import { login, logout, resetPassword } from './controllers';
import { requestResetPassword } from './controllers';
import {
  requestResetPasswordValidationSchema,
  resetPasswordValidationSchema,
} from './validationSchemas/body';
import { resetPasswordIdParamsValidation } from './validationSchemas/urlParams';

export const authRouter = Express.Router();

authRouter.post('/login', asyncErrorHandler(login));

authRouter.post('/logout', logout);

authRouter.post(
  '/reset-password',
  validate({ body: requestResetPasswordValidationSchema }),
  asyncErrorHandler(requestResetPassword)
);

authRouter.post(
  '/reset-password/:resetPasswordId',
  validate({
    body: resetPasswordValidationSchema,
    urlParams: resetPasswordIdParamsValidation,
  }),
  asyncErrorHandler(resetPassword)
);
