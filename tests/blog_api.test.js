const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');

const helper = require('./test_helper');

const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('verify unique identifier properties of the blog posts are named id', async () => {
  const response = await api.get('/api/blogs');

  const blogIdPropertyExists = response.body.map((blog) =>
    Object.hasOwn(blog, 'id')
  );

  const doesEveryBlogHaveId = blogIdPropertyExists.every(
    (value) => value === true
  );

  assert.strictEqual(doesEveryBlogHaveId, true);
});

test('verify that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'title of new blog',
    author: 'author of new blog',
    url: 'url of new blog',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((blogs) => blogs.title);
  assert(contents.includes('title of new blog'));
});

test('delete a blog and return a status code of 204', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  assert(!titles.includes(blogToDelete.title));
});

after(async () => {
  await mongoose.connection.close();
});
