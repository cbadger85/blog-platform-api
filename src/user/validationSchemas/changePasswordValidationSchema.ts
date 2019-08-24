import Joi from '@hapi/joi';
import { customValidationMessages, passwordRegExp } from '../../utils';

export const changePasswordValidationSchema = Joi.object()
  .keys({
    password: Joi.string()
      .regex(passwordRegExp)
      .required()
      .error(customValidationMessages),
    currentPassword: Joi.string()
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
