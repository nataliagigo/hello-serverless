const aws = require('aws-sdk');

async function searchItem(itemID) {
    const dynamoDb = new aws.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000'});
    const getItemParams = {
        TableName: "Market",
        Key: {
            itemID
        }
    };

    return await dynamoDb.get(getItemParams).promise()
        .then(res => {
            let item = JSON.parse(JSON.stringify(res)).Item;
            if (!item) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: `The item does not exists in the market` }),
                    headers: { 'Content-Type': 'application/json' }
                };
            }
            return item;
        })
        .catch(error => {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: `Could not search item in the market: ${error.message}` }),
                headers: { 'Content-Type': 'application/json' }
            };
        });
}

module.exports.searchItem = searchItem;
