import Joi, { Err } from '@hapi/joi';
import mongoose from 'mongoose';

export const mongoJoi = Joi.extend({
  name: 'string',
  base: Joi.string(),
  language: { mongoObjectId: 'Invalid ObjectID' },
  rules: [
    {
      name: 'mongoObjectId',
      validate(params: never, value: string, state, prefs): string | Err {
        if (mongoose.Types.ObjectId.isValid(value)) {
          return value;
        }

        return this.createError(
          'string.mongoObjectId',
          { v: value },
          state,
          prefs
        );
      },
    },
  ],
});
