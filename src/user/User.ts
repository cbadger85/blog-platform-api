import { Document, model, Model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import uuid from 'uuid/v4';
import { Permissions } from './types';
import md5 from 'md5';

export interface UserModel extends Document {
  name: string;
  username: string;
  email: string;
  bio: string;
  password: string;
  permissions: Permissions;
  sessionId: string;
  resetPasswordId: string;
  resetPasswordExpiration: Date;
  gravatar: string;
}

export const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 25,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    uniqueCaseInsensitive: true,
    minlength: 2,
    maxlength: 15,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uniqueCaseInsensitive: true,
    lowercase: true,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  //! needs a fixin
  permissions: {
    accessLevel: {
      type: [String],
    },
    collections: [
      {
        // needs to reference mongoId when collections are implemented
        collectionId: {
          type: String,
        },
        accessLevel: {
          type: [String],
        },
      },
    ],
  },
  sessionId: {
    type: String,
    default: uuid(),
  },
  resetPasswordId: {
    type: String,
    default: uuid(),
  },
  resetPasswordExpiration: {
    type: Date,
    default: Date.now() + 1000 * 60 * 60 * 24,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 250,
  },
});

UserSchema.virtual('gravatar').get(function(this: UserModel) {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200&r=pg&d=retro`;
});

UserSchema.plugin(uniqueValidator);

export const User: Model<UserModel> = model<UserModel>('User', UserSchema);
