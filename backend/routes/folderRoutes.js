const express = require('express');

const folderController = require('../controllers/folderController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get('/:id', folderController.getFolder);
router.post('/', folderController.createFolder);
router.delete('/:id', folderController.deleteFolder);

module.exports = router;
