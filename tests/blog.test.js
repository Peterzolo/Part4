// eslint-disable-next-line no-unused-vars
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = 1;
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("Get total likes", () => {
  test("should return the total likes for all posts", () => {
    const posts = [
      {
        author: "Malisa",
        title: "Social Media Empowerment 6",
        url: "https://images.unsplash.com/photo-1680771447988-94c040d9868b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
        likes: 20,
        id: "6433b020842ad898e956fb72",
      },
      {
        author: "Malisa",
        title: "Social Media Empowerment",
        url: "https://images.unsplash.com/photo-1680771447988-94c040d9868b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
        likes: 20,
        id: "6433b02d842ad898e956fb74",
      },
      {
        author: "Malisa",
        title: "Social Media Empowerment 3",
        url: "https://images.unsplash.com/photo-1680771447988-94c040d9868b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
        likes: 20,
        id: "6433b03c842ad898e956fb76",
      },
    ];

    const total = listHelper?.totalPostLikes(posts);
    const result = total;
    expect(result).toBe(60);
  });
});

describe("Get post with the most likes", () => {
  test("Should return the blog post with the hightest number of likes", () => {
    const blogPosts = [
      {
        author: "nancy",
        title: "Social Media Empowerment 1",
        url: "https://images.unsplash.com/photo-1680771447988-94c040d9868b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
        likes: 20,
        id: "6433b020842ad898e956fb72",
      },
      {
        author: "Malisa",
        title: "the secret of writing Ebook",
        url: "https://images.unsplash.com/photo-1680771447988-94c040d9868b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
        likes: 20,
        id: "6433b02d842ad898e956fb74",
      },
      {
        author: "twitwi",
        title: "Social Media Marketing",
        url: "https://images.unsplash.com/photo-1680771447988-94c040d9868b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
        likes: 30,
        id: "6433b03c842ad898e956fb76",
      },
    ];

    const highestNumOflikes = listHelper.favoriteBlog(blogPosts);
    const result = highestNumOflikes;
    expect(result).toEqual({
      author: "twitwi",
      likes: 30,
      title: "Social Media Marketing",
      url: "https://images.unsplash.com/photo-1680771447988-94c040d9868b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
      id: "6433b03c842ad898e956fb76",
    });
  });
});
