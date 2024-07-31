const Folder = require('../models/folderModel');
const Formbot = require('../models/formbotModel');
const AppError = require('../utils/appError');
// const Question = require('../models/questionModel');
const catchAsync = require('../utils/catchAsync');

exports.getFormbot = catchAsync(async (req, res, next) => {
  const formbot = await Formbot.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      data: formbot,
    },
  });
});

exports.createFormbot = catchAsync(async (req, res, next) => {
  const { name, theme, messages, folder } = req.body;

  const folderDoc = await Folder.findById(folder);

  if (!folderDoc || !folderDoc.user.equals(req.user._id)) {
    return next(new AppError('Folder not found!', 404));
  }

  const formbot = await Formbot.create({
    name,
    theme,
    messages,
    folder,
    user: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: formbot,
    },
  });
});

exports.updateFormbot = catchAsync(async (req, res, next) => {
  const formbot = await Formbot.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!formbot) {
    return next(
      new AppError(`Cannot find the formbot with id: ${req.params.id}`, 404),
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: formbot,
    },
  });
});

exports.deleteFormbot = catchAsync(async (req, res, next) => {
  await Formbot.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.checkFormbotUser = catchAsync(async (req, res, next) => {
  const formbot = await Formbot.findById(req.params.id);

  console.log({ formbot });

  if (!formbot) {
    return next(new AppError(`Cannot find formbot with ${req.params.id}`, 404));
  }

  if (!formbot.user.equals(req.user._id)) {
    return next(
      new AppError(
        `You are not authorized to access formbot: ${req.params.id}`,
        401,
      ),
    );
  }

  next();
});
