const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // your app
const User = require("../models/User");

const api = supertest(app);

describe("User API", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  describe("when creating a new user", () => {
    test("fails if username is too short", async () => {
      const newUser = {
        username: "us",
        name: "Sammy Joe",
        passwordHash: "password",
      };

      const response = await api.post("/api/users").send(newUser);

      expect(response.status).toBe(404);
      expect(response.error.message).toContain("All fields must be entered");
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
