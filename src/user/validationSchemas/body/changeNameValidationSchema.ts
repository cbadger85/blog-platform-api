import Joi from '@hapi/joi';
import { customValidationMessages } from '../../../utils';

export const changeNameValidationSchema = Joi.object()
  .keys({
    name: Joi.string()
      .trim()
      .min(2)
      .max(25)
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
