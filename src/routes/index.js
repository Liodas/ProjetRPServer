import express from 'express';
import { login, register, charactersList } from '../controllers';

const indexRouter = express.Router();

indexRouter.post('/login', login);
indexRouter.post('/register', register);
indexRouter.get('/charactersList', charactersList);

export default indexRouter;
