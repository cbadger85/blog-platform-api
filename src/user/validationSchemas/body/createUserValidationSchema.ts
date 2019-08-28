import Joi from '@hapi/joi';
import { customValidationMessages } from '../../../utils';

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
  })
  .error(customValidationMessages);
