const express = require('express');

const app = express();
app.use(express.json());

const loginRoute = require('../database/routes/login');

app.use('/login', loginRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
