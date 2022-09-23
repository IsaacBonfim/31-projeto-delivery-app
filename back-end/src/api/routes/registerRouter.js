const { Router } = require('express');
const RegisterController = require('../controllers/registerController');

const RegisterRouter = Router();

RegisterRouter.post('/', RegisterController.registerUser);

module.exports = RegisterRouter;
