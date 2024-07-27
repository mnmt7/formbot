const Formbot = require('../models/formbotModel');
const AppError = require('../utils/appError');
// const Question = require('../models/questionModel');
const catchAsync = require('../utils/catchAsync');

exports.getFormbot = catchAsync(async (req, res, next) => {});

exports.createFormbot = catchAsync(async (req, res, next) => {
  // req.body.questions.forEach((q) => {
  //   q.id = Math.floor(Math.random() * 10000);
  // });

  req.body.user = req.user._id;
  const formbot = await Formbot.create(req.body);

  // const questionArr = req.body.questions.map((question, index) => ({
  //   ...question,
  //   serialNo: index + 1,
  //   formbot: formbot._id,
  // }));

  // const questionDocs = await Question.create(questionArr);

  // formbot.questions = questionDocs.map((question) => question._id);
  // await formbot.save();

  res.status(201).json({
    status: 'success',
    data: {
      data: formbot,
    },
  });
});

exports.deleteFormbot = catchAsync(async (req, res, next) => {
  const formbot = await Formbot.findById(req.params.id);

  if (!formbot) {
    return next(
      new AppError(`Cannot find the formbot with id: ${req.params.id}`, 404),
    );
  }

  if (!formbot.user.equals(req.user._id)) {
    return next(
      new AppError('You are not authorized to delete this formbot', 401),
    );
  }

  await Formbot.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
