const express = require("express");
const Blog = require("../models/Blog");

const blogRouter = express.Router();

blogRouter.post("/", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(404).json({ error: "name or phone is missing" });
  }
  if (!body.phone) {
    return res.status(404).json({ error: "name or phone is missing" });
  }

  const newUsewr = new Blog({
    name: body.name,
    phone: body.phone,
  });

  newUsewr
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

module.exports = blogRouter;
