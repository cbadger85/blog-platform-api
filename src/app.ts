import Joi from '@hapi/joi';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express from 'express';
import { authRouter } from './auth/auth.routes';
import {
  errorHandlers,
  getUserFromTokens,
  logger,
  validate,
} from './middleware';
import { userRouter } from './user/user.routes';
import { asyncErrorHandler, customValidationMessages, mongoJoi } from './utils';
import { Handler } from 'express-serve-static-core';

export const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(logger());

export const idValidation = Joi.object()
  .keys({
    id: mongoJoi
      .string()
      .mongoObjectId()
      .error(customValidationMessages),
  })
  .error(customValidationMessages);

app.get('/hello/:id', validate({ urlParams: idValidation }), (req, res) => {
  res.send('success');
});

app.use(asyncErrorHandler(getUserFromTokens() as Handler));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(errorHandlers);
