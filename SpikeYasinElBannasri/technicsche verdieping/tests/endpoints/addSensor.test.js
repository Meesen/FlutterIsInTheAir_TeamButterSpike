//This package is used for generating random data to put in Mock Sensor
import { faker } from "@faker-js/faker";
import { expect, jest, test } from "@jest/globals";
//With this package you can mock the AWS SDK
import AWSMock from "aws-sdk-mock";
import AWS from "aws-sdk";

//Importing the Lambda Function
const lambda = require("../../addSensor/index.js");
//This package is needed for creating a mock API Gateway Event
//Just calling a Lambda function doesn't create an API Gateway Event
const createEvent = require("aws-event-mocks");

//AWS config stuff, needed
AWS.config.update({ region: "eu-west-1" });



describe("addSensorTest", () => {
  let mockEvent;
  beforeEach(() => {
    const mockSensor = {
      id: faker.random.word(),
      description: faker.random.words(5),
      image: faker.image.abstract(),
      locationid: faker.random.word(),
      name: faker.random.word(),
      sku: faker.random.word(),
    };
    mockEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: JSON.stringify(mockSensor),
      },
    });
  });

  it("returns statusCode 201", async () => {
    //Tell AWS SDK Mock what our AWS SDK instance is
    AWSMock.setSDKInstance(AWS);
    //Mock a certain service of the AWS SDK
    AWSMock.mock("DynamoDB.DocumentClient", "put", function (params, callback) {
      callback(null, `Succesfully added mocked sensor ${params}`);
    });
    const response = await lambda.handler(mockEvent);
    expect(response.statusCode).toBe(201);
  });

  
});
