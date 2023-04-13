const express = require("express");
const Blog = require("../models/Blog");

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

blogRouter.get("/", async (req, res) => {
  try {
    const posts = await Blog.find();
    if (!posts.length) {
      return res.status(400).json({ message: "No post was found" });
    }
    res.status(200).json({ result: posts });
  } catch (error) {
    res.status(403).json(error);
  }
});

module.exports = blogRouter;
