import { Document, model, Model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import uuid from 'uuid/v4';
import { IPermissions } from './types';
import md5 from 'md5';

export interface IUserModel extends Document {
  name: string;
  username: string;
  email: string;
  bio: string;
  password: string;
  permissions: IPermissions[];
  sessionId: string;
  resetPasswordId: string;
  resetPasswordExpiration: Date;
  gravatar: string;
}

export const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    uniqueCaseInsensitive: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uniqueCaseInsensitive: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
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
  },
});

UserSchema.virtual('gravatar').get(function(this: IUserModel) {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200&r=pg&d=retro`;
});

UserSchema.plugin(uniqueValidator);

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
