import AWS from "aws-sdk";
import {
  expect,
  afterEach,
  beforeEach,
  beforeAll,
} from "@jest/globals";
import { faker } from "@faker-js/faker";

AWS.config.update({ region: "eu-west-1" });

const lambda = require("../../getSensors/index.js");
let mockSensor;
describe("get all sensors", () => {
  beforeAll(() => {
    mockSensor = {
      id: faker.random.word(),
      description: faker.random.words(5),
      image: faker.image.abstract(),
      locationid: faker.random.word(),
      name: faker.random.word(),
      sku: faker.random.word(),
    };
  });
  beforeEach(async () => {
  });
  afterEach(async () => {
  });

  it("get request returns array of sensors", async () => {
    let result = await lambda.handler();
    console.log(result.body.length);
    expect(result.body.length).toBeGreaterThanOrEqual(0);
  });
  
  it("get request returns 200", async () => {
    let result = await lambda.handler();
    expect(result.statusCode).toEqual(200);
  });

  it("get request returns array", async () => {
    let result = await lambda.handler();
    expect(JSON.parse(result.body)).toBeInstanceOf(Array);
  });
});
