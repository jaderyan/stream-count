const router = require('express').Router();
const {
  getUser, startStream, stopStream, deleteUser,
} = require('../controllers');

router.route('/streams/users/:userId').get(getUser).delete(deleteUser);

router.route('/streams/users/:userId/start').post(startStream);

router.route('/streams/users/:userId/stop').post(stopStream);

router.use('/*', (req, res, next) => {
  const err = new Error('Invalid path');
  err.statusCode = 404;
  next(err);
});

module.exports = router;
