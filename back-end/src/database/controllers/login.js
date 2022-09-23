const userLogin = (req, res) => res.status(200).json(req.headers.authorization);

module.exports = {
  userLogin,
}