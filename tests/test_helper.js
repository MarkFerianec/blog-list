const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Title of blog',
    author: 'Author of blog',
    url: 'Url of blog',
    likes: 1,
  },
  {
    title: 'Title of blog2',
    author: 'Author of blog2',
    url: 'Url of blog2',
    likes: 2,
  },
  {
    title: 'Title of blog3',
    author: 'Author of blog3',
    url: 'Url of blog3',
    likes: 3,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
