const UserRouter = require('./user');
const EventRouter = require('./event');
const OrgRouter = require('./org');
const JuncRouter = require('./user_org_junc');
const AuthRouter = require('./auth');
const express = require('express');
const router = express.Router();

router.use('/user', UserRouter);
router.use('/event', EventRouter);
router.use('/org', OrgRouter);
router.use('/junc', JuncRouter);
router.use('/login', AuthRouter);
module.exports = router;