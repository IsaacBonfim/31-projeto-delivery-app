const jwt = require('jsonwebtoken');
const { readFile } = require('./readFile');

const secret = readFile();

const createToken = ({ id, name, role, email }) => {
  const jwtConfig = { expiresIn: '21d', algorithm: 'HS256' };
  const payload = { data: { id, name, role, email } };
  const token = jwt.sign(payload, secret, jwtConfig);
  return { token, id, role, name, email };
};

module.exports = createToken;
