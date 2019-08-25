import mongoose from 'mongoose';
import { User } from '../user/User';
import bcrypt from 'bcryptjs';
import { IPermissions } from '../user/types';
import 'colors';

(async function bootstrap() {
  mongoose.Promise = global.Promise;

  console.log('Creating default admin account...'.cyan);

  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.error(e);
  }

  await mongoose.connection.on('error', e => {
    console.error(e.message);
  });

  const name = (process.env.ADMIN_NAME as string) || 'Admin';
  const username = (process.env.ADMIN_USERNAME as string) || 'admin';
  const email = (process.env.ADMIN_EMAIL as string) || 'admin@email.com';
  const password = (process.env.ADMIN_PASSWORD as string) || 'Password123';

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      console.log(`${userExists.username} already exists. aborting...`.red);
      await mongoose.disconnect();
    }
  } catch (e) {
    console.error(e);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      permissions: [IPermissions.USER_MANAGEMENT],
    });

    console.log(`${user.username} created successfully`.green);
  } catch (e) {
    console.error(e);
  }

  await mongoose.disconnect();
})();
