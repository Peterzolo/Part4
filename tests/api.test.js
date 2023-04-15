const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");
const helper = require("./test_helper");

const api = supertest(app);

describe("blog post API", () => {
  test("returns correct amount of blog posts in a json format", async () => {
    const response = await api.get("/api/blogs");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(helper.initialBlogposts.length);
  });
});

test("blog posts have id as the unique identifier property", () => {
  expect(helper.initialBlogposts.id).toBeDefined();
  expect(helper.initialBlogposts._id).toBeUndefined();
});

describe("POST /api/blogs", () => {
  test("should create a new blog post", async () => {
    const blogPost = {
      title: "Test Blog Post",
      content: "This is a test blog post.",
    };

    const result = await api.post("/api/blogs").send(blogPost).expect(200);
    console.log(result);

    const blogs = await Blog.find({});
    expect(blogs.length).toBe(+1);

    const savedBlog = await Blog.findById(result.body._id);
    expect(savedBlog.title).toBe(blogPost.title);
    expect(savedBlog.content).toBe(blogPost.content);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
