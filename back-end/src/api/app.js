const express = require('express');
const cors = require('cors');
const LoginRouter = require('./routes/loginRouter');
const RegisterRouter = require('./routes/registerRouter');
const SalesRouter = require('./routes/salesRouter');
const errorMidlleware = require('./midllewares/errorMidlleware');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/login', LoginRouter);
app.use('/register', RegisterRouter);
app.use('/customer', SalesRouter);

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorMidlleware);

module.exports = app;
