const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;
    const id = event.queryStringParameters.id;
    const { image, locationid, manifacturer, name, sku, description } = JSON.parse(event.body);
    console.log(id);
    const params = {
        TableName: "sensors",
        Key: {
            id: id
        },
        UpdateExpression: "set image = :i, locationid = :l, manifacturer = :m, #name = :n, sku = :s, description = :d, updated_at = :u",
        ExpressionAttributeNames: {
            "#name": "name",
          },
        ExpressionAttributeValues: {
            ":i": image,
            ":l": locationid,
            ":m": manifacturer,
            ":n": name,
            ":s": sku,
            ":d": description,
            ":u": new Date().toLocaleString("nl-BE", { timeZone: "CET" }),
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 200;
    } catch (err) {
        responseBody = `Unable to update Product: ${err}`;
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