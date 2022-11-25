import AWS from "aws-sdk";
import {
  expect,
  afterEach,
  beforeEach,
  beforeAll,
} from "@jest/globals";
import { faker } from "@faker-js/faker";

AWS.config.update({ region: "eu-west-1" });

const lambda = require("../../getSensor/index.js");

describe('get single sensor', () => {
    beforeAll(() => {
    });
    beforeEach(async () => {
    });
    afterEach(async () => {
    });
    
    it('get request returns sensor object, not array', async () => {
        let result = await lambda.handler({queryStringParameters: {id: 'test'}});
        console.log(result.body);
        expect(Array.isArray(JSON.parse(result.body))).toBe(false);
    });
    
    it('get request returns 200', async () => {
        let result = await lambda.handler({queryStringParameters: {id: 'test'}});
        expect(result.statusCode).toEqual(200);
    });
    
    it('get request returns object', async () => {
        let result = await lambda.handler({queryStringParameters: {id: 'test'}});
        expect(JSON.parse(result.body)).toBeInstanceOf(Object);
    });
})