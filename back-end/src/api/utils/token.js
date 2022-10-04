const jwt = require('jsonwebtoken');
const { readFile } = require('./readFile');
const throwError = require('./errorHandler');

const secret = readFile();

const createToken = ({ id, name, role, email }) => {
  const jwtConfig = { expiresIn: '21d', algorithm: 'HS256' };
  const payload = { data: { id, name, role, email } };
  const token = jwt.sign(payload, secret, jwtConfig);
  return { token, id, role, name, email };
};

const validateToken = ({ authorization }) => {
  if (!authorization) {
    throwError('unauthorized', 'Invalid Token');
  }

  let token = '';

  if (authorization.split(' ').length > 1) {
    [, token] = authorization.split(' ');
  } else {
    token = authorization;
  }

  try {
    const { data } = jwt.verify(token, secret);
    return data;
  } catch (error) {
    throwError('unauthorized', 'Invalid or Expired Token');
  }
};

module.exports = {
  createToken,
  validateToken,
};
