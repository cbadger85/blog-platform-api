import Joi from '@hapi/joi';
import { customValidationMessages, passwordRegExp } from '../../../utils';

export const resetPasswordValidationSchema = Joi.object()
  .keys({
    password: Joi.string()
      .regex(passwordRegExp)
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
