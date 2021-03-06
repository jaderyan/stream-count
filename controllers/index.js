const User = require('../models/user');

async function addUser(userId, next) {
  try {
    const newUser = new User({ userId, streams: 1 });
    await newUser.save();

    return newUser;
  } catch (err) {
    next(err);
  }

  return null;
}

async function removeUser(userId, next) {
  try {
    const { deletedCount } = await User.deleteOne({ userId });

    return deletedCount > 0;
  } catch (err) {
    next(err);
  }

  return null;
}

async function getUser(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (user) {
      return res.send(user);
    }

    // send error if user doesn't exsist
    const err = new Error('User not found');
    err.statusCode = 404;
    return next(err);
  } catch (err) {
    return next(err);
  }
}

async function startStream(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (user) {
      // only increase count if user has less than 3 streams
      if (user.streams < 3) {
        user.streams += 1;
        await user.save();

        return res.status(200).send(user);
      }

      // send error message if user has reached maximum streams
      const err = new Error('Maximum number of streams reached');
      err.statusCode = 403;
      next(err);
    }

    // if there is no user create one with one active stream
    const newUser = await addUser(userId, next);

    return res.status(201).send(newUser);
  } catch (err) {
    return next(err);
  }
}

async function stopStream(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (user) {
      user.streams -= 1;
      await user.save();

      // if user now has no streams remove them from database
      if (user.streams === 0) {
        const userRemoved = await removeUser(userId, next);

        if (userRemoved) {
          res.json({ message: 'User has no active streams and have been removed from tracking' });
        } else {
          const err = new Error('User has no active streams but cannot be removed from tracking');
          err.statusCode = 404;
          return next(err);
        }
      }

      return res.send(user);
    }

    // if user doesn't exist send an error message
    return res.status(404).json({
      error: 'User has no active streams to stop',
    });
  } catch (err) {
    return next(err);
  }
}

async function deleteUser(req, res, next) {
  const { userId } = req.params;

  try {
    const userRemoved = await removeUser(userId, next);

    if (userRemoved) {
      return res.json({ message: 'User sucessfully deleted' });
    }

    // send error if user did not exist to be deleted
    const err = new Error('User does not exist');
    err.statusCode = 409;
    return next(err);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getUser,
  startStream,
  stopStream,
  deleteUser,
};
