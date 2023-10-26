const OrgController = require('../controllers').OrgController;
const express = require('express');
const router = express.Router();

router.route('/').post(OrgController.createOrg);
router.route('/:id').get(OrgController.geOrgById);

module.exports = router;