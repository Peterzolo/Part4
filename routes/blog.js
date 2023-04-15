const express = require("express");
const { addPost, getBlogs } = require("../controllers/blog");
const blogRouter = express.Router();

blogRouter.post("/", addPost);
blogRouter.get("/", getBlogs);

module.exports = blogRouter;
