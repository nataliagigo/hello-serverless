const buyer = require('../api/buyer');
const seeker = require('../api/seeker');
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');

test('must try to update existent absence with required parameters', async () => {
    seeker.searchItem = jest.fn().mockReturnValue({
        "item": {
            "itemID": "1",
            "itemName": "Panela",
            "itemMeasureUnity": "Libra",
            "itemPrice": "2K",
            "itemCount": "1"
        }
    });
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'update', function (params, callback) {
        expect(params.Key.itemID).toBe("1");
        callback(null, { item: {Attributes: {itemCount: '0'}}});
    });
    let result = await buyer.buyItem('1', '1');
    expect(result).toMatchObject({"item": {"Attributes": {"itemCount": "0"}}});
    AWSMock.restore('DynamoDB.DocumentClient');
});