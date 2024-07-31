const express = require('express');

const formbotController = require('../controllers/formbotController');
const responseRouter = require('./responseRoutes');
const authController = require('../controllers/authController');
const formbotValidation = require('../validations/formbotValidation');

const router = express.Router();

router.use(authController.protect);

router.post('/', formbotValidation.new, formbotController.createFormbot);

router.use(
  '/:id',
  formbotValidation.paramId,
  formbotController.checkFormbotUser,
);

router.use('/:id/responses', responseRouter);

router
  .route('/:id')
  .get(formbotController.getFormbot)
  .put(formbotController.updateFormbot)
  .delete(formbotController.deleteFormbot);

module.exports = router;
