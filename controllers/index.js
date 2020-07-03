const User = require('../models/user');

async function addUser(userId) {
  const newUser = new User({ userId, streams: 1 });
  await newUser.save();

  return newUser;
}

async function getUser(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });
    return (user ? res.send(user) : res
      .status(404)
      .json({ error: 'User not found' }));
  } catch (err) {
    return next(err);
  }
}

async function startStream(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (user) {
      let status;
      let data;

      // only increase count if user has less than 3 streams
      if (user.streams < 3) {
        user.streams += 1;
        await user.save();

        status = 200;
        data = user;
      } else {
        status = 403;
        data = { error: 'Maximum number of streams reached' };
      }

      return res.status(status).send(data);
    }

    // if there is no new user create one with one active stream
    const newUser = await addUser(userId);

    return res.status(201).send(newUser);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getUser,
  startStream,
};
