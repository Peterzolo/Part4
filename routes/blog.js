const express = require("express");
const { addPost, getBlogs } = require("../controllers/blog");
const { authenticateToken } = require("../utils/middleware");
const blogRouter = express.Router();

blogRouter.post("/", authenticateToken, addPost);
blogRouter.get("/", getBlogs);

module.exports = blogRouter;
