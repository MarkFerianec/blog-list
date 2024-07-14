const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  total = 0;

  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    blogs.forEach((blog) => {
      total += blog.likes;
    });
    return total;
  }
};

module.exports = {
  dummy,
  totalLikes,
};
