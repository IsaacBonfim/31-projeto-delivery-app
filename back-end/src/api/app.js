const express = require('express');
const cors = require('cors');
const LoginRouter = require('./routes/loginRouter');
const RegisterRouter = require('./routes/registerRouter');
const SalesRouter = require('./routes/salesRouter');
const OrderRouter = require('./routes/orderRouter');
const errorMidlleware = require('./midllewares/errorMidlleware');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/images', express.static('images/public'));
app.use('/login', LoginRouter);
app.use('/register', RegisterRouter);
app.use('/customer', SalesRouter);
app.use('/orders', OrderRouter);

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorMidlleware);

module.exports = app;
