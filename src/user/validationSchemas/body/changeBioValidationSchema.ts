import Joi from '@hapi/joi';
import { customValidationMessages } from '../../../utils';

export const changeBioValidationSchema = Joi.object()
  .keys({
    bio: Joi.string()
      .alphanum()
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
