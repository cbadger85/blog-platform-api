import bcrypt from 'bcryptjs';
import uuid from 'uuid/v4';

export const randomPassword = async (): Promise<string> => {
  return await bcrypt.hash(uuid(), 10);
};
