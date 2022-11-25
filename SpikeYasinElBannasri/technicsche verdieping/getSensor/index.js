'use strict';

const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const id = event.queryStringParameters.id;
    console.log(id);
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "sensors",
        Key: {
            "id": id
        }
    };

    try {
        // const data = await documentClient.scan(params).promise();
        // let filteredData = data.Items.filter((item) => item["sensor-data-id"] === id) 
        // responseBody = JSON.stringify(filteredData);

        const data = await documentClient.get(params).promise();     
        responseBody = JSON.stringify(data);   

        statusCode = 200;
    } catch (err) {
        responseBody = `Unable to get sensor: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };

    return response;
};
