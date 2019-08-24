import Joi from '@hapi/joi';
import { customValidationMessages } from '../../utils';

export const changeEmailValidationSchema = Joi.object()
  .keys({
    email: Joi.string()
      .email()
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
