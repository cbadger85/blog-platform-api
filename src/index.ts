import bodyParser from 'body-parser';
import cors from 'cors';
import Express, { Handler } from 'express';
import mongoose from 'mongoose';
import { errorHandlers } from './middleware';
import { userRouter } from './user/user.routes';
import { authRouter } from './auth/auth.routes';
import cookieParser from 'cookie-parser';
import { getUserFromTokens } from './middleware/getUserFromTokens';
import { asyncErrorHandler } from './utils';

mongoose.connect(process.env.MONGODB_URL as string, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', e => {
  console.error(e.message);
});

const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({ origin: process.env.ADMIN_UI_URL }));

app.use(asyncErrorHandler(getUserFromTokens()));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(errorHandlers);

app.listen(7777, () => {
  console.log('App is listening on port 7777');
});
