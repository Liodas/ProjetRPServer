import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/login', indexRouter);
app.use('/register', indexRouter);

export default app;
