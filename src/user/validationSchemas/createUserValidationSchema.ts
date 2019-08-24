import Joi from '@hapi/joi';
import { customValidationMessages, passwordRegExp } from '../../utils';

export const createUserValidationSchema = Joi.object()
  .keys({
    username: Joi.string()
      .alphanum()
      .required()
      .error(customValidationMessages),
    email: Joi.string()
      .email()
      .required()
      .error(customValidationMessages),
    name: Joi.string()
      .required()
      .error(customValidationMessages),
    password: Joi.string()
      .regex(passwordRegExp)
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
