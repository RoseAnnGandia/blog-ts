import app from "../../src/app";
import request from "supertest";
import mockData from "./post.mock.json";

const postEndpoint = `/api/v1/posts`;
let postId = "";

describe("POST /posts", () => {
  it("should create a new post", async () => {
    const response = await request(app)
      .post(`${postEndpoint}`)
      .set("authorization", `Bearer ${global.accessToken}`)
      .send(mockData.createPostInput);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(mockData.createPostInput.title);

    postId = response.body._id;
  });

  it("should return a 403 error for no authorization headers", async () => {
    const response = await request(app)
      .post(`${postEndpoint}`)
      .send(mockData.createPostInput);

    expect(response.status).toBe(403);
  });

  it("should return a 400 error for a request with an extra field", async () => {
    const response = await request(app)
      .post(`${postEndpoint}`)
      .set("authorization", `Bearer ${global.accessToken}`)
      .send({
        ...mockData.createPostInput,
        extrafield: "Extra value",
      });

    expect(response.status).toBe(400);
  });
});

describe("PUT posts/:id", () => {
  it("should update a post", async () => {
    const response = await request(app)
      .put(`${postEndpoint}/${postId}`)
      .set("authorization", `Bearer ${global.accessToken}`)
      .send(mockData.updatePostInput);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(mockData.updatePostInput.title);
  });

  it("should return a 403 error for no authorization headers", async () => {
    const response = await request(app)
      .put(`${postEndpoint}/${postId}`)
      .send(mockData.updatePostInput);

    expect(response.status).toBe(403);
  });

  it("should return a 403 error for a post that does not belong to the user", async () => {
    const response = await request(app)
      .put(`${postEndpoint}/${mockData.notExistPost}`)
      .set("authorization", `Bearer ${global.accessToken}`)
      .send(mockData.updatePostInput);

    expect(response.status).toBe(403);
  });

  it("should return a 400 error for a request with an extra field", async () => {
    const response = await request(app)
      .put(`${postEndpoint}/${postId}`)
      .set("authorization", `Bearer ${global.accessToken}`)
      .send({
        ...mockData.updatePostInput,
        extrafield: "Extra value",
      });

    expect(response.status).toBe(400);
  });
});

describe("GET posts/:id", () => {
  it("should return a post details", async () => {
    const response = await request(app)
      .get(`${postEndpoint}/${postId}`)
      .set("authorization", `Bearer ${global.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(mockData.updatePostInput.title);
  });

  it("should return a 403 error for no authorization headers", async () => {
    const response = await request(app).get(`${postEndpoint}/${postId}`);

    expect(response.status).toBe(403);
  });

  it("should return a 404 error for a non-exsitent post", async () => {
    const response = await request(app)
      .get(`${postEndpoint}/${mockData.notExistPost}`)
      .set("authorization", `Bearer ${global.accessToken}`);

    expect(response.status).toBe(404);
  });
});

describe("GET posts/", () => {
  it("should return list of posts", async () => {
    const response = await request(app)
      .get(`${postEndpoint}`)
      .set("authorization", `Bearer ${global.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe(mockData.updatePostInput.title);
  });

  it("should return a 403 error for no authorization headers", async () => {
    const response = await request(app).get(`${postEndpoint}`);

    expect(response.status).toBe(403);
  });
});

describe("GET posts/authors/:authorId", () => {
  it("should return list of posts by authorId", async () => {
    const response = await request(app)
      .get(`${postEndpoint}/authors/${global.userId}`)
      .set("authorization", `Bearer ${global.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe(mockData.updatePostInput.title);
  });

  it("should return a 403 error for no authorization headers", async () => {
    const response = await request(app).get(`${postEndpoint}`);

    expect(response.status).toBe(403);
  });
});

describe("DELETE posts/:id", () => {
  it("should delete a post", async () => {
    const response = await request(app)
      .delete(`${postEndpoint}/${postId}`)
      .set("authorization", `Bearer ${global.accessToken}`);

    expect(response).toBeDefined();
    expect(response.status).toBe(204);
  });

  it("should return a 403 error for no authorization headers", async () => {
    const response = await request(app).delete(`${postEndpoint}/${postId}`);

    expect(response.status).toBe(403);
  });

  it("should return a 404 error for a non-exsitent post", async () => {
    const response = await request(app)
      .delete(`${postEndpoint}/${mockData.notExistPost}`)
      .set("authorization", `Bearer ${global.accessToken}`)
      .send(mockData.updatePostInput);

    expect(response.status).toBe(404);
  });
});
