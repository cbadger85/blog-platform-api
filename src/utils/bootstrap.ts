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

  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD as string,
    10
  );

  try {
    const user = await User.create({
      name: process.env.ADMIN_NAME,
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    console.log(`${user.name} created successfully`);
  } catch (e) {
    console.error(e);
  }

  await mongoose.disconnect();
})();
