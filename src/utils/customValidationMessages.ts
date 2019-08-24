import { ValidationErrorItem } from '@hapi/joi';

export const customValidationMessages = (
  errors: ValidationErrorItem[]
): ValidationErrorItem[] => {
  errors.forEach(e => {
    switch (e.type) {
      case 'string.alphanum':
        e.message = `Error, '${
          e.context!.key
        }' must consist of alpha-numberics`;
        break;
      case 'any.empty':
        e.message = `Error, '${e.context!.key}' is required`;
        break;
      case 'string.email':
        e.message = `Error, '${e.context!.key}' not valid`;
        break;
      case 'string.regex.base':
        if (e.context!.key === 'password') {
          e.message = `Error, '${e.context!.key}' must be a valid password`;
          break;
        }

        e.message = `Error, '${e.context!.key}' is invalid`;
        break;
      default:
        break;
    }
  });

  return errors;
};
