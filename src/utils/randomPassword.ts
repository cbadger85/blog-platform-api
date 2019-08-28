import bcrypt from 'bcryptjs';
import uuid from 'uuid/v4';

export const randomPassword = async () => {
  return await bcrypt.hash(uuid(), 10);
};
