const usersRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    return res.status(404).json({ warning: "All fields must be entered" });
  }
  try {
    const saltRounds = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = usersRouter;
