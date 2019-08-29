import Joi from '@hapi/joi';
import { customValidationMessages } from '../../../utils';

export const changeBioValidationSchema = Joi.object()
  .keys({
    bio: Joi.string()
      .trim()
      .alphanum()
      .required()
      .max(250)
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
