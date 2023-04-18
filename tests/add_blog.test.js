const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany();
});

describe("POST /api/blogs", () => {
  test.only("creates a new blog post", async () => {
    const newBlog = {
      author: "Manny Steve",
      title: "Digital functionality",
      url: "https://images.unsplash.com/photo-1680771447988-94c040d9868b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
      likes: 5,
      userId: "643cdfeb98c2c8965a94e18e",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(response.status)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogs = await Blog.find({});
    expect(blogs).toHaveLength(1);

    const savedBlog = blogs[0];
    expect(savedBlog.author).toBe(newBlog.author);
    expect(savedBlog.title).toBe(newBlog.title);
    expect(savedBlog.url).toBe(newBlog.url);
    expect(savedBlog.likes).toBe(newBlog.likes);
    expect(savedBlog.userId).toBe(newBlog.userId);

    expect(response.body.result).toMatchObject(savedBlog.toJSON());
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
