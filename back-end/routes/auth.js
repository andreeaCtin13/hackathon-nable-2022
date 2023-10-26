const UserController = require('../controllers').UserController;
const OrgController = require('../controllers').OrgController;
const AuthController = require('../controllers').AuthController;
const express = require('express');
const router = express.Router();

router.route('/user').post(UserController.checkUser);
router.route('/org').post(OrgController.checkOrg);
module.exports = router;