const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

describe("blog post API", () => {
  test("returns correct amount of blog posts in a json format", async () => {
    const response = await api.get("/api/blogs");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(helper.initialBlogposts.length);
  });
});

test.only("blog posts have id as the unique identifier property", () => {
  expect(helper.initialBlogposts.id).toBeDefined();
  expect(helper.initialBlogposts._id).toBeUndefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});
