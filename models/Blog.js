const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
});

BlogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("person", BlogSchema);

module.exports = Blog;
