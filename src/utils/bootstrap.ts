import mongoose from 'mongoose';
import { User } from '../user/User';
import bcrypt from 'bcryptjs';

(async function bootstrap() {
  await mongoose.connect(process.env.MONGODB_URL as string, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  mongoose.Promise = global.Promise;
  await mongoose.connection.on('error', e => {
    console.error(e.message);
  });

  const name = process.env.ADMIN_NAME as string;
  const username = process.env.ADMIN_USERNAME as string;
  const email = process.env.ADMIN_EMAIL as string;
  const password = process.env.ADMIN_PASSWORD as string;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      console.log(`${userExists.username} already exists`);
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
    });

    console.log(`${user.username} created successfully`);
  } catch (e) {
    console.error(e);
  }

  await mongoose.disconnect();
})();
