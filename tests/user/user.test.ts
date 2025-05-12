import app from "../../src/app";
import request from "supertest";
import mockData from "./user.mock.json";

const userEndpoint = `/api/v1/users`;

describe("PUT users/:id", () => {
  it("should update a user", async () => {
    const response = await request(app)
      .put(`${userEndpoint}/${global.userId}`)
      .set("authorization", `Bearer ${global.accessToken}`)
      .send(mockData.updateUserInput);

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe(mockData.updateUserInput.firstName);
  });

  it("should return a 403 error for no authorization headers", async () => {
    const response = await request(app)
      .put(`${userEndpoint}/${global.userId}`)
      .send(mockData.updateUserInput);

    expect(response.status).toBe(403);
  });

  it("should return a 404 error for a non-exsitent user", async () => {
    const response = await request(app)
      .put(`${userEndpoint}/${mockData.notExistUser}`)
      .set("authorization", `Bearer ${global.accessToken}`)
      .send(mockData.updateUserInput);

    expect(response.status).toBe(404);
  });

  it("should return a 400 error for a request with an extra field", async () => {
    const response = await request(app)
      .put(`${userEndpoint}/${mockData.notExistUser}`)
      .set("authorization", `Bearer ${global.accessToken}`)
      .send({
        ...mockData.updateUserInput,
        extrafield: "Extra value",
      });

    expect(response.status).toBe(400);
  });
});

describe("GET users/:id", () => {
  it("should return a user details", async () => {
    const response = await request(app)
      .get(`${userEndpoint}/${global.userId}`)
      .set("authorization", `Bearer ${global.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe(mockData.updateUserInput.firstName);
  });

  it("should return a 403 error for no authorization headers", async () => {
    const response = await request(app).get(`${userEndpoint}/${global.userId}`);

    expect(response.status).toBe(403);
  });

  it("should return a 404 error for a non-exsitent user", async () => {
    const response = await request(app)
      .get(`${userEndpoint}/${mockData.notExistUser}`)
      .set("authorization", `Bearer ${global.accessToken}`);

    expect(response.status).toBe(404);
  });
});

describe("GET users/", () => {
  it("should return list of users", async () => {
    const response = await request(app)
      .get(`${userEndpoint}`)
      .set("authorization", `Bearer ${global.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body[0].firstName).toBe(mockData.updateUserInput.firstName);
  });

  it("should return a 403 error for no authorization headers", async () => {
    const response = await request(app).get(`${userEndpoint}`);

    expect(response.status).toBe(403);
  });
});

describe("DELETE users/:id", () => {
  it("should delete a user", async () => {
    const response = await request(app)
      .delete(`${userEndpoint}/${global.userId}`)
      .set("authorization", `Bearer ${global.accessToken}`);

    expect(response).toBeDefined();
    expect(response.status).toBe(204);
  });

  it("should return a 403 error for no authorization headers", async () => {
    const response = await request(app).delete(
      `${userEndpoint}/${global.userId}`
    );

    expect(response.status).toBe(403);
  });

  it("should return a 404 error for a non-exsitent user", async () => {
    const response = await request(app)
      .delete(`${userEndpoint}/${mockData.notExistUser}`)
      .set("authorization", `Bearer ${global.accessToken}`)
      .send(mockData.updateUserInput);

    expect(response.status).toBe(404);
  });
});
