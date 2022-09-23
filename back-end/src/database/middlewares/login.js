const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { Users } = require('../models')

const jwtKey = require("fs")
  .readFileSync('jwt.evaluation.key', { encoding: "utf-8" }).trim();

const generateToken = (req, res, next) => {
  const { email, password } = req.body;
  const passwordHash = md5(password);
  return Users.findOne({where: { email, password: passwordHash }})
  .then((user) => {
    if (!user) {
      return res.status(404).json({Error: 'Usuário ou senha inválidos'})
    }

    const { dataValues } = user;

    const obj = {
      token: jwt.sign({ email, password: passwordHash }, jwtKey),
      role: dataValues.role,
      name: dataValues.name,
      userId: dataValues.id,
      email: dataValues.email,
    }
    
    req.headers.authorization = obj;
    next();
  })
};

module.exports = {
  generateToken,
};