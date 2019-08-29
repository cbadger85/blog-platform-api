import Joi from '@hapi/joi';
import { customValidationMessages } from '../../../utils';

export const changeEmailValidationSchema = Joi.object()
  .keys({
    email: Joi.string()
      .trim()
      .email()
      .max(20)
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
