import Joi from '@hapi/joi';
import { customValidationMessages } from '../../../utils';

export const changeUsernameValidationSchema = Joi.object()
  .keys({
    username: Joi.string()
      .trim()
      .alphanum()
      .min(2)
      .max(15)
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
