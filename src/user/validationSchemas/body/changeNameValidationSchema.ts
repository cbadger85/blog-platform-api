import Joi from '@hapi/joi';
import { customValidationMessages } from '../../../utils';

export const changeNameValidationSchema = Joi.object()
  .keys({
    username: Joi.string()
      .trim()
      .alphanum()
      .min(2)
      .max(25)
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
