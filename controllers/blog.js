const express = require("express");
const Blog = require("../models/Blog");
const User = require("../models/User");

const blogRouter = express.Router();

blogRouter.post("/", async (req, res) => {
  const { author, title, url, likes } = req.body;

  try {
    if (!author || !title || !url || !likes) {
      return res.status(404).json({ error: "All fields must be entered" });
    }
    const newBlog = new Blog({
      author,
      title,
      url,
      likes,
    });
    const savedBlog = await newBlog.save();
    res.status(200).json({ result: savedBlog });
  } catch (error) {
    res.status(403).json(error);
  }
});

blogRouter.post("/test", async (req, res) => {
  const { author, title, url, likes, userId } = req.body;

  const user = await User.findById(userId);

  const newBlog = new Blog({
    author,
    title,
    url,
    likes,
    userId,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(200).json(savedBlog);
});

blogRouter.get("/", async (req, res) => {
  try {
    const posts = await Blog.find().populate("userId");
    if (!posts.length) {
      return res.status(400).json({ message: "No post was found" });
    }
    res.status(200).json({ result: posts });
  } catch (error) {
    res.status(403).json(error);
  }
});

module.exports = blogRouter;
