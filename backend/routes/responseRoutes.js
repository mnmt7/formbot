const express = require('express');

const responseController = require('../controllers/responseController');

const router = express.Router({ mergeParams: true });

router.get('/', responseController.getAllResponses);

module.exports = router;
