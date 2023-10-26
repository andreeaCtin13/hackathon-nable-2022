const EventController = require('../controllers').EventController;
const express = require('express');
const router = express.Router();

router.route('/').post(EventController.createEvent);
router.route('/').get(EventController.geEventById);
module.exports = router;