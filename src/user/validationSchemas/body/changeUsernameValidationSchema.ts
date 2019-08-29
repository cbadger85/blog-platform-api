import Joi from '@hapi/joi';
import { customValidationMessages } from '../../../utils';

export const changeUsernameValidationSchema = Joi.object()
  .keys({
    username: Joi.string()
      .alphanum()
      .required()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);
