const catchAsync = require('../utils/catchAsync');
const Response = require('../models/responseModel');

exports.getAllResponses = catchAsync(async (req, res, next) => {
  const responses = await Response.find({ formbot: req.params.id });

  res.status(200).json({
    status: 'success',
    data: { data: responses },
  });
});
