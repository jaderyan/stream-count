const router = require('express').Router();
const { getUser, startStream } = require('../controllers');

router.route('/streams/users/:userId').get(getUser);

router.route('/streams/users/:userId/start').post(startStream);

module.exports = router;
