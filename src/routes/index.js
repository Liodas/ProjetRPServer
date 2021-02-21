import express from 'express';
import { login, register } from '../controllers';

const indexRouter = express.Router();

indexRouter.post('/login', login);
indexRouter.post('/register', register);

export default indexRouter;
