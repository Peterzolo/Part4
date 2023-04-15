const Blog = require("../models/Blog");
const User = require("../models/User");

exports.addPost = async (req, res) => {
  const body = req.body;
  console.log("BODY", body);
  try {
    const user = await User.findById(req.body.userId);
    const newBlog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes,
      userId: user._id,
    });

    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog);
  } catch (error) {
    res.status(403).json(error);
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const posts = await Blog.find().populate("userId");
    if (!posts.length) {
      return res.status(400).json({ message: "No post was found" });
    }
    res.status(200).json({ result: posts });
  } catch (error) {
    res.status(403).json(error);
  }
};
