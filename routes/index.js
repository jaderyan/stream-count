const router = require('express').Router();
const { getUser, startStream, stopStream } = require('../controllers');

router.route('/streams/users/:userId').get(getUser);

router.route('/streams/users/:userId/start').post(startStream);

router.route('/streams/users/:userId/stop').post(stopStream);

module.exports = router;
