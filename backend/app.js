const express = require('express');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const formbotRouter = require('./routes/formbotRoutes');
const chatRouter = require('./routes/chatRoutes');
const folderRouter = require('./routes/folderRoutes');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/formbots', formbotRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/folders', folderRouter);

app.use(globalErrorHandler);

module.exports = app;
