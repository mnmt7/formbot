const catchAsync = require('../utils/catchAsync');
const Folder = require('../models/folderModel');
const AppError = require('../utils/appError');
const { default: mongoose } = require('mongoose');

exports.getFolder = catchAsync(async (req, res, next) => {
  const folder = await Folder.findById(req.params.id)
    .populate({
      path: 'folders',
    })
    .populate({ path: 'formbots', select: '_id name' });

  if (!folder) {
    return next(new AppError('Folder not found!', 404));
  }

  if (!folder.user.equals(req.user._id)) {
    return next(
      new AppError('You are not authorized to access this folder!', 401),
    );
  }

  // const childFolders = await Folder.find({ parent: folder._id }).select(
  //   '-parent',
  // );

  res.status(200).json({
    status: 'success',
    data: {
      data: folder,
    },
  });
});

exports.createFolder = catchAsync(async (req, res, next) => {
  const { name, parent } = req.body;

  const parentFolder = await Folder.findById(parent);

  if (!parentFolder || !parentFolder.user.equals(req.user._id)) {
    return next(new AppError('Folder not found', 404));
  }

  const folder = await Folder.create({ name, parent, user: req.user._id });

  res.status(201).json({
    status: 'success',
    data: {
      data: folder,
    },
  });
});

exports.deleteFolder = catchAsync(async (req, res, next) => {
  const folder = await Folder.findById(req.params.id);

  if (folder._id === req.user.folder) {
    return next(new AppError('Cannot delete the root folder', 404));
  }

  await Folder.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.checkFolderUser = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError(`Invalid folder Id: ${req.params.id}`, 401));
  }

  const folder = await Folder.findById(req.params.id);

  if (!folder) {
    return next(new AppError(`Cannot find folder with ${req.params.id}`, 404));
  }

  if (!folder.user.equals(req.user._id)) {
    return next(
      new AppError(
        `You are not authorized to access folder: ${req.params.id}`,
        401,
      ),
    );
  }

  next();
});
