const JuncController = require('../controllers').JuncController;
const express = require('express');
const router = express.Router();

router.route('/').post(JuncController.createJunc);
router.route('/:id').get(JuncController.getJuncsByUserId);

module.exports = router;