const { Router } = require('express');
const LoginController = require('../controllers/loginController');

const LoginRouter = Router();

LoginRouter.post('/', LoginController.loginUser);

module.exports = LoginRouter;