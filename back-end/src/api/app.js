const express = require('express');
const LoginRouter = require('./routes/loginRouter');
const RegisterRouter = require('./routes/registerRouter');
const errorMidlleware = require('./midllewares/errorMidlleware');

const app = express();
app.use(express.json());

app.use('/login', LoginRouter);

app.use('/register', RegisterRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMidlleware);

module.exports = app;
