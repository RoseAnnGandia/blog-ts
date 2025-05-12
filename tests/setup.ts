import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
  var accessToken: string;
  var refreshToken: string;
  var endpoint: string;
  var userId: string;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);

  global.accessToken = "";
  global.refreshToken = "";
  global.endpoint = "/api/v1";
  global.userId = "";
});

const deleteAll = async () => {
  const collections = (await mongoose?.connection?.db?.collections()) || [];

  for (const collection of collections) {
    await collection.deleteMany({});
  }
};

afterAll(async () => {
  await deleteAll();
  await mongoose.disconnect();
  await mongo.stop();

  global.accessToken = "";
  global.refreshToken = "";
  global.endpoint = "/api/v1";
  global.userId = "";
});
