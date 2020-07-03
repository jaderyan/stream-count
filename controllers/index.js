const User = require('../models/user');

function getUser(req, res, next) {
  const { userId } = req.params;

  return User.findOne({ userId }).then((user) => (user ? res.send(user) : res
    .status(404)
    .json({ error: 'User not found' }))).catch((err) => next(err));
}

module.exports = {
  getUser,
};
