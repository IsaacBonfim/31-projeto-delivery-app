const express = require('express');
const RegisterRouter = require('./routes/registerRouter');
const errorMidlleware = require('./midllewares/errorMidlleware');

const app = express();
app.use(express.json());

const loginRoute = require('../database/routes/login');

app.use('/login', loginRoute);

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/register', RegisterRouter);

app.use(errorMidlleware);

module.exports = app;
