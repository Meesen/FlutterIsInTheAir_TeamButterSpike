'use strict';

const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const { id, description, image, locationid, manufacturer,
    name, sku } = JSON.parse(event.body);

    const params = {
        TableName: "sensors",
        Item: {
            id: id,
            created_at: new Date().toLocaleString("nl-BE", { timeZone: "CET" }),
            description: description,
            image: image,
            locationid: locationid,
            manufacturer: manufacturer,
            name: name,
            sku: sku
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        responseBody = `Unable to put Sensor: ${err}`;
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