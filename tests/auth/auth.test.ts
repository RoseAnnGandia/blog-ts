import app from "../../src/app";
import request from "supertest";
import mockData from "./auth.mock.json";

// const authEndpoint = `${global.endpoint}/auth`;
const authEndpoint = `/api/v1/auth`;

describe("POST /signup", () => {
  it("should sign up a user", async () => {
    const response = await request(app)
      .post(`${authEndpoint}/signup`)
      .send(mockData.registerUserInput);

    expect(response.status).toBe(201);
    expect(response.body.firstName).toBe(mockData.registerUserInput.firstName);
    expect(response.body.email).toBe(mockData.registerUserInput.email);

    global.userId = response.body._id;
    expect(global.userId).toBeDefined();
  });

  it("should return a 400 error for invalid email", async () => {
    const response = await request(app)
      .post(`${authEndpoint}/signup`)
      .send(mockData.invalidEmailInput);

    expect(response.status).toBe(400);
  });

  it("should return a 409 error for existing email", async () => {
    const response = await request(app)
      .post(`${authEndpoint}/signup`)
      .send(mockData.registerUserInput);

    expect(response.status).toBe(409);
  });

  it("should return a 400 error for invalid password format", async () => {
    const response = await request(app).post(`${authEndpoint}/signup`).send({
      email: mockData.validEmail,
      password: mockData.invalidPassword,
    });

    expect(response.status).toBe(400);
  });
});

describe("POST /signin", () => {
  it("should sign in a user", async () => {
    const response = await request(app)
      .post(`${authEndpoint}/signin`)
      .set("device-id", mockData.deviceId)
      .send({
        email: mockData.registerUserInput.email,
        password: mockData.registerUserInput.password,
      });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();

    global.accessToken = response.body.accessToken;
    global.refreshToken = response.body.refreshToken;
  });

  it("should return a 404 error for not registered email", async () => {
    const response = await request(app)
      .post(`${authEndpoint}/signin`)
      .set("device-id", mockData.deviceId)
      .send({
        email: mockData.notExistEmail,
        password: mockData.wrongPassword,
      });

    expect(response.status).toBe(404);
  });

  it("should return a 401 error for wrong password", async () => {
    const response = await request(app)
      .post(`${authEndpoint}/signin`)
      .set("device-id", mockData.deviceId)
      .send({
        email: mockData.registerUserInput.email,
        password: mockData.wrongPassword,
      });

    expect(response.status).toBe(401);
  });

  it("should return a 403 error for no device-id headers", async () => {
    const response = await request(app).post(`${authEndpoint}/signin`).send({
      email: mockData.registerUserInput.email,
      password: mockData.registerUserInput.password,
    });

    expect(response.status).toBe(403);
  });
});
