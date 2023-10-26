const UserController = require('./user');
const EventController = require('./event');
const OrgController = require('./org');
const JuncController = require('./user_org_junc');
const AuthController = require('./auth');
module.exports = {
    UserController,
    EventController,
    OrgController,
    JuncController,
    AuthController,
}
