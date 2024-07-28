const express = require('express');

const formbotController = require('../controllers/formbotController');
const responseRouter = require('../routes/responseRoutes');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.use('/:id/responses', responseRouter);

router
  .route('/:id')
  .get(formbotController.getFormbot)
  .put(formbotController.updateFormbot)
  .delete(formbotController.deleteFormbot);

router.post('/', formbotController.createFormbot);

module.exports = router;
