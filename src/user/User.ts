import { Document, model, Model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import uuid from 'uuid/v4';
import { IPermissions } from './types';

export interface IUserModel extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  permissions: IPermissions[];
  sessionId: string;
  resetPasswordId: string;
  resetPasswordExpiration: Date;
  bio: string;
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
  bio: String,
});

UserSchema.plugin(uniqueValidator);

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
