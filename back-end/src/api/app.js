const express = require('express');
const { default: RegisterRouter } = require('./routes/registerRouter');
const { default: errorMidlleware } = require('./midllewares/errorMidlleware');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/customer', RegisterRouter);

app.use(errorMidlleware);

module.exports = app;
