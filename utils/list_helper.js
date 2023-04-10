const dummy = (blogs) => {
  return blogs;
};

const totalPostLikes = (posts) => {
  const total = posts.reduce((total, post) => total + post.likes, 0);
  console.log("TOTAL----", total);
  return total;
};

module.exports = {
  dummy,
  totalPostLikes,
};
