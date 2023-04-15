const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
// const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const blogRouter = require("./routes/blog");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(express.static("build"));

app.use(express.json());
app.use(cors());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":url :method :res[content-length] - :response-time ms :date[web]")
);

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(middleware.requestLogger);

module.exports = app;
