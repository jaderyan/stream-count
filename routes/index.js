const router = require('express').Router();
const { getUser } = require('../controllers');

router.route('/streams/users/:userId').get(getUser);

module.exports = router;
