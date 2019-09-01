import { ValidationErrorItem } from '@hapi/joi';
import { oc } from 'ts-optchain';

export const customValidationMessages = (
  errors: ValidationErrorItem[]
): ValidationErrorItem[] => {
  errors.forEach(e => {
    switch (e.type) {
      case 'string.alphanum':
        e.message = `Error, '${
          oc(e).context.key
        }' must consist of alpha-numberics`;
        break;
      case 'any.empty':
        e.message = `Error, '${oc(e).context.key}' is required`;
        break;
      case 'any.required':
        e.message = `Error, '${oc(e).context.key}' is required`;
        break;
      case 'string.email':
        e.message = `Error, '${oc(e).context.key}' not valid`;
        break;
      case 'string.regex.base':
        if (e.context && e.context.key === 'password') {
          e.message = `Error, '${
            oc(e).context.key
          }' must be between 6 and 20 characters, and must contain one upper-case character, one lowercase character, and at least one number or special character`;
          break;
        }

        e.message = `Error, '${oc(e).context.key}' is invalid`;
        break;
      case 'object.allowUnknown':
        e.message = `Error, '${oc(e).context.key}' is not allowed`;
        break;
      case 'string.mongoObjectId':
        e.message = `Error, '${oc(e).context.key}' is an invalid ObjectId`;
        break;
      case 'string.guid':
        e.message = `Error, '${oc(e).context.key}' is not a valid ObjectId`;
        break;
      case 'string.min':
        e.message = `Error, '${oc(e).context.key}' must be at least ${
          oc(e).context.limit
        } characters long`;
        break;
      case 'string.max':
        e.message = `Error, '${oc(e).context.key}' must be no more than ${
          oc(e).context.limit
        } characters long`;
        break;
      default:
        break;
    }
  });

  return errors;
};
