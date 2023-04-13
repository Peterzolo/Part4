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

blogRouter.get("/", (req, res) => {
  Blog.find({})
    .then((response) => {
      if (!response.length) {
        res.status(400).json("No blog found");
      } else {
        res.status(200).json({
          message: "Blogs fetched",
          result: response,
        });
      }
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
});

module.exports = blogRouter;
