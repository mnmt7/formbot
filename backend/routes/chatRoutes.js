const express = require('express');

const chatController = require('../controllers/chatController');

const router = express.Router();

router
  .route('/:id')
  .get(chatController.getChat)
  .post(chatController.createChat);

module.exports = router;
