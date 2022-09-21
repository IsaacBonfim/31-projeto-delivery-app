const express = require('express');
const { default: RegisterRouter } = require('./routes/registerRouter');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/customer', RegisterRouter);

module.exports = app;
