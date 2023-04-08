const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const personRouter = require("./controllers/persons");
const app = express();

// eslint-disable-next-line no-unused-vars

app.use(express.static("build"));
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(cors());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":url :method :res[content-length] - :response-time ms :date[web] :body"
  )
);

app.use("/api/persons", personRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

module.exports = app;
