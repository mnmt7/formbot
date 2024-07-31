const mongoose = require('mongoose');

const Response = require('../models/responseModel');
const Formbot = require('../models/formbotModel');
// const Question = require('../models/questionModel');
const catchAsync = require('../utils/catchAsync');

const getQuesAndSendRes = async (messageStart, formbotId, responseId, res) => {
  const formbot = await Formbot.findById(formbotId);

  const allMessages = formbot.messages;

  const messages = [];
  let response;
  let nextMessage = 0;
  let currMessage;

  for (let i = messageStart; i < allMessages.length; i += 1) {
    const message = allMessages[i];

    if (message.type === 'input') {
      nextMessage = i + 1;
      response = message;
      // currMessage = message._id;
      break;
    }

    messages.push(message);
  }

  const data = {
    messages,
    // currMessage,
    nextMessage,
    responseId,
    response,
  };

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
};

exports.getChat = catchAsync(async (req, res, next) => {
  const formbot = await Formbot.findById(req.params.id);
  formbot.views += 1;
  await formbot.save();

  const responseId = new mongoose.Types.ObjectId();
  getQuesAndSendRes(0, req.params.id, responseId, res);

  // const formbot = await Formbot.findById(req.params.id);
  // const { questions: allQuestions } = formbot;
  // const questions = [];
  // let questionIdx = 0;
  // for (let i = 0; i < allQuestions.length; i += 1) {
  //   // const questionId = allQuestions[i];
  //   // const question =
  //   //   await Question.findById(questionId).select('-formbot -__v');
  //   const question = allQuestions[i];
  //   if (question.questionType === 'input') {
  //     questionIdx = i;
  //     break;
  //   }
  //   questions.push(question);
  // }
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     data: {
  //       questions,
  //       questionIdx,
  //     },
  //   },
  // });
});

exports.createChat = catchAsync(async (req, res, next) => {
  const { response, responseId, nextMessage } = req.body;
  // todo: validating for number
  // todo: validating if correct response id. i know. not sure.

  const formbot = req.params.id;

  if (response) {
    let responseDoc = await Response.findById(responseId);
    if (!responseDoc) {
      responseDoc = await Response.create({
        _id: responseId,
        formbot,
        responses: [],
      });
    }

    responseDoc.responses.push(response);
    await responseDoc.save();
  }

  getQuesAndSendRes(nextMessage, formbot, responseId, res);
});
