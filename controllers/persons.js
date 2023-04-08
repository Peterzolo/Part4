const express = require("express");
const Person = require("../models/person");

const personRouter = express.Router();

personRouter.get("/", (req, res) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        const now = new Date();
        const dayOfWeek = now.toLocaleString("en-US", { weekday: "long" });
        const month = now.toLocaleString("en-US", { month: "long" });
        const dayOfMonth = now.toLocaleString("en-US", { day: "numeric" });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString("en-US", { hour12: false });
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const responseDate = ` ${dayOfWeek}, ${month} ${dayOfMonth}, ${year} at ${time} (${timezone})`;
        const infoCount = `The phonebook has info for ${persons.length} people`;

        res.status(200).json({
          infoCount,
          responseDate,
          result: persons,
        });
      } else {
        res.status(400).json("No data found");
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

personRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const person = Person.findById(id)
    .then((response) => {
      if (!person) {
        return res.status(400).json("No data found");
      }
      console.log("SINGLE PERSON", response);
      res.status(200).json({ result: response });
    })
    .catch((error) => {
      console.error(error);
    });
});

personRouter.get("/info", (req, res) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        const now = new Date();
        const dayOfWeek = now.toLocaleString("en-US", { weekday: "long" });
        const month = now.toLocaleString("en-US", { month: "long" });
        const dayOfMonth = now.toLocaleString("en-US", { day: "numeric" });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString("en-US", { hour12: false });
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const responseDate = ` ${dayOfWeek}, ${month} ${dayOfMonth}, ${year} at ${time} (${timezone})`;
        const infoCount = `The phonebook has info for ${persons.length} people`;

        res.status(200).json({
          infoCount,
          responseDate,
          result: persons,
        });
      } else {
        res.status(400).json("No data found");
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

personRouter.post("/", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(404).json({ error: "name or phone is missing" });
  }
  if (!body.phone) {
    return res.status(404).json({ error: "name or phone is missing" });
  }

  const newUsewr = new Person({
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

personRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).json("Data deleted");
    })
    .catch((error) => error);
});

personRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  Person.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching user", error });
    });
});

personRouter.put("/:id", (req, res) => {
  const userId = req.params.id;

  Person.findById(userId)
    .then((user) => {
      const updatePhoneOnly = {
        name: user.name,
        phone: req.body.phone,
      };

      const updateFullDetail = {
        name: req.body.name,
        phone: req.body.phone,
      };
      if (user.name === req.body.name) {
        Person.findByIdAndUpdate(userId, updatePhoneOnly, {
          new: true,
          runValidators: true,
          context: "query",
        }).then((result) => {
          res.status(200).json({ message: "Phone Number updated", result });
        });
      } else {
        Person.findByIdAndUpdate(userId, updateFullDetail, {
          new: true,
          runValidators: true,
          context: "query",
        }).then((result) => {
          res.status(200).json({ message: "User updated", result });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching user", error });
    });
});

module.exports = personRouter;
