import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express from 'express';
import { authRouter } from './auth/auth.routes';
import { errorHandlers, logger } from './middleware';
import { getUserFromTokens } from './middleware/getUserFromTokens';
import { userRouter } from './user/user.routes';
import { asyncErrorHandler } from './utils';

export const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({ origin: process.env.ADMIN_UI_URL }));

app.use(logger());

app.use(asyncErrorHandler(getUserFromTokens()));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(errorHandlers);
