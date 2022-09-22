import express, { json } from 'express';
import RegisterRouter from './routes/registerRouter';
import errorMidlleware from './midllewares/errorMidlleware';

const app = express();
app.use(json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/customer', RegisterRouter);

app.use(errorMidlleware);

export default app;
