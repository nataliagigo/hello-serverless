const aws = require('aws-sdk');
const seeker = require('./seeker');

async function buyItem(itemID, requestedItemCount) {
    const dynamoDb = new aws.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000'});
    let item = await seeker.searchItem(itemID);
    if (item.statusCode) {
        return item; 
    }
    let count = item.itemCount;
    let resultingCount = parseInt(count) - parseInt(requestedItemCount);
    if (resultingCount < 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: `There are not enough items to sell` }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
    const updateItemParams = {
        //TableName: process.env.marketTable,
        TableName: "Market",
        Key: { itemID },
        UpdateExpression: "set itemCount = :itemCount",
        ExpressionAttributeValues: {
            ":itemCount": resultingCount.toString()
        },
        ReturnValues: "UPDATED_NEW"
    };

    return await dynamoDb.update(updateItemParams).promise()
        .then(res => {
            return JSON.parse(JSON.stringify(res));
        }).catch(error => {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: `Could not update item in the market: ${error.message}` }),
                headers: { 'Content-Type': 'application/json' }
            };
        });
}

module.exports.buyItem = buyItem;
