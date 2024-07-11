const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URI);

app.use(middleware.morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
