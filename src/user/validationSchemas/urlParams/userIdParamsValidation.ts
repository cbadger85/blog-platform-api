import Joi from '@hapi/joi';
import { customValidationMessages, mongoJoi } from '../../../utils';

export const userIdParamsValidation = Joi.object()
  .keys({
    userId: mongoJoi
      .string()
      .mongoObjectId()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
