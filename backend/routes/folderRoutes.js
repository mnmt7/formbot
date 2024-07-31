const express = require('express');

const folderController = require('../controllers/folderController');
const authController = require('../controllers/authController');
const folderValidation = require('../validations/folderValidation');

const router = express.Router();

router.use(authController.protect);

// router.use('/:id', [para]);
router.post('/', folderValidation.new, folderController.createFolder);

router.use('/:id', folderController.checkFolderUser);

router.get('/:id', folderController.getFolder);
router.delete('/:id', folderController.deleteFolder);

module.exports = router;
