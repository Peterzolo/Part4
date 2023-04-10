const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  author: {
    type: String,
    minLength: 3,
    required: true,
  },
  title: {
    type: String,
    minLength: 3,
    required: true,
  },
  url: {
    type: String,
    minLength: 3,
    required: true,
  },
  likes: {
    type: Number,
  },
});

BlogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("blog", BlogSchema);

module.exports = Blog;
