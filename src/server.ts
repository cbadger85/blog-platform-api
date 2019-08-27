import 'colors';
import colors from 'colors/safe';
import mongoose from 'mongoose';
import { asyncFiglet } from './utils';
import { app } from './app';

(async function Server() {
  console.log(colors.yellow('Starting server...'));

  mongoose.Promise = global.Promise;

  await mongoose.connect(process.env.MONGODB_URL as string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  await mongoose.connection.on('error', e => {
    console.error(e.message.red);
  });

  const PORT = process.env.PORT || 7777;

  app.listen(PORT, async () => {
    const portFiglet = await asyncFiglet(`Server Started`, { font: 'Slant' });

    console.log(colors.green(portFiglet as string));
    console.log(colors.green(`App is listening on port ${PORT}`));
  });
})().catch(e => console.error(e));
