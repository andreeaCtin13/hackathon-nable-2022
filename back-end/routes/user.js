const UserController = require('../controllers').UserController;
const express = require('express');
const router = express.Router();

router.route('/').post(UserController.createUser);
router.route('/:id').get(UserController.getUserById);
module.exports = router;