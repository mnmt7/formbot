const mongoose = require('mongoose');

const Answers = require('../models/responseModel');
const Formbot = require('../models/formbotModel');
// const Question = require('../models/questionModel');
const catchAsync = require('../utils/catchAsync');

const getQuesAndSendRes = async (currQuestion, formbotId, answersId, res) => {
  const formbot = await Formbot.findById(formbotId);

  const { questions: allQuestions } = formbot;

  const questions = [];
  let nextQuestion = 0;

  for (let i = currQuestion; i < allQuestions.length; i += 1) {
    const question = allQuestions[i];

    if (question.questionType === 'input') {
      nextQuestion = i + 1;
      break;
    }

    questions.push(question);
  }

  const data = {
    questions,
    nextQuestion,
  };

  if (answersId) {
    data.answersId = answersId;
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
};

exports.getChat = catchAsync(async (req, res, next) => {
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
  const answersId = new mongoose.Types.ObjectId();
  getQuesAndSendRes(0, req.params.id, answersId, res);
});

exports.createChat = catchAsync(async (req, res, next) => {
  const { answer, answersId, nextQuestion } = req.body;

  const formbot = req.params.id;

  let answersDoc = await Answers.findById(answersId);
  if (!answersDoc) {
    answersDoc = await Answers.create({ _id: answersId, formbot, answers: [] });
  }

  answersDoc.answers.push(answer);
  await answersDoc.save();

  getQuesAndSendRes(nextQuestion, formbot, answersDoc._id, res);
});
