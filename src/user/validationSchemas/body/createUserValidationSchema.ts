import Joi from '@hapi/joi';
import { customValidationMessages } from '../../../utils';

export const createUserValidationSchema = Joi.object()
  .keys({
    username: Joi.string()
      .trim()
      .alphanum()
      .min(2)
      .max(15)
      .required()
      .error(customValidationMessages),
    email: Joi.string()
      .trim()
      .email()
      .max(20)
      .required()
      .error(customValidationMessages),
    name: Joi.string()
      .trim()
      .min(2)
      .max(25)
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
