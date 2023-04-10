const express = require("express");
const Blog = require("../models/Blog");

const blogRouter = express.Router();

blogRouter.post("/", (req, res) => {
  const { author, title, url, voteCount } = req.body;

  if (!author || !title || !url || !voteCount) {
    return res.status(404).json({ error: "All fields must be entered" });
  }

  const newBlog = new Blog({
    author,
    title,
    url,
    voteCount,
  });

  newBlog
    .save()
    .then((response) => {
      res.status(200).json({
        result: response,
      });
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
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
