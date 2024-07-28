const catchAsync = require('../utils/catchAsync');
const Response = require('../models/responseModel');
const Formbot = require('../models/formbotModel');

exports.getAllResponses = catchAsync(async (req, res, next) => {
  // todo: check if formbot actually belongs to the user
  const formbot = await Formbot.findById(req.params.id);
  const messages = formbot.messages.filter(
    (message) => message.type === 'input',
  );
  const responses = await Response.find({ formbot: req.params.id });

  res.status(200).json({
    status: 'success',
    data: { data: { messages, responses } },
  });
});
