import Joi from '@hapi/joi';
import { customValidationMessages, mongoJoi } from '../../../utils';

export const resetPasswordIdParamsValidation = Joi.object()
  .keys({
    resetPasswordId: mongoJoi
      .string()
      .mongoObjectId()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
