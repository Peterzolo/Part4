const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany();
});

describe("Blog controller", () => {
  describe("Get all the blog post available in the database, A unique identifier should be id", () => {
    test.only("It should fetch all the existing blog posts in the database", async () => {
      const response = await api.get("/api/blogs");
      expect(response.status).toBe(200);
      const posts = response.body.result;
      expect(posts).toBeDefined();

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        expect(post.id).toBeDefined();
        expect(post._id).toBeUndefined();
      }
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
