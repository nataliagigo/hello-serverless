const seeker = require('../api/seeker');
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');

test('must return item when searching a existent one', async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
        expect(params.Key.itemID).toBe("1");
        callback(null, { Item: {itemID: "1"} });
    });
    let result = await seeker.searchItem("1");
    expect(result).toMatchObject({"itemID": "1"});
    AWSMock.restore('DynamoDB.DocumentClient');
});

test('must return error when searching a non existent item', async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
        expect(params.Key.itemID).toBe("0");
        callback(null, {  });
    });
    let result = await seeker.searchItem("0");
    expect(result.statusCode).toBe(404);
    expect(result.body).toBe("{\"message\":\"The item does not exists in the market\"}");
    AWSMock.restore('DynamoDB.DocumentClient');
});

test('must return error when searching an item failed', async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
        expect(params.Key.itemID).toBe("0");
        callback(new Error('Error'), null);
    });
    let result = await seeker.searchItem("0");
    expect(result.statusCode).toBe(500);
    expect(result.body).toBe("{\"message\":\"Could not search item in the market: Error\"}");
    AWSMock.restore('DynamoDB.DocumentClient');
});