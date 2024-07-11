require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Temporary
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');

// Moved
// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number,
// });

// const Blog = mongoose.model('Blog', blogSchema);

mongoose.connect(config.MONGODB_URI);

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Temporary
app.use('/api/blogs', blogsRouter);

// Moved
// app.get('/api/blogs', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
