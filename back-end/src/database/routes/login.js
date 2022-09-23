const express = require('express');

const router = express.Router();

const { generateToken } = require('../middlewares/auth');

const { userLogin } = require('../controllers/login');

router.post('/', generateToken, userLogin);

module.exports = router;