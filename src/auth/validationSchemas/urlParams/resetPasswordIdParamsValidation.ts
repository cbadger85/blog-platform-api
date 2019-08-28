import Joi from '@hapi/joi';
import { customValidationMessages } from '../../../utils';

export const resetPasswordIdParamsValidation = Joi.object()
  .keys({
    resetPasswordId: Joi.string()
      .uuid()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
