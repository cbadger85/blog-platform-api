import mongoose from 'mongoose';
import { app } from './app';
import 'colors';

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URL as string, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('error', e => {
  console.error(e.message.red);
});

app.listen(7777, () => {
  console.log('App is listening on port 7777');
});
