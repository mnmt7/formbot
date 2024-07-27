const catchAsync = require('../utils/catchAsync');
const Folder = require('../models/folderModel');
const AppError = require('../utils/appError');

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

  if (!parentFolder.user.equals(req.user._id)) {
    return next(new AppError('Parent folder does not belong to the user', 401));
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

  if (!folder) {
    return next(
      new AppError(`Cannot find the folder with id: ${req.params.id}`, 404),
    );
  }

  if (folder.user !== req.user._id) {
    return next(
      new AppError('You are not authorized to delete this folder', 401),
    );
  }

  if (folder._id === req.user.folder) {
    return next(new AppError('Cannot delete the root folder', 404));
  }

  await Folder.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
