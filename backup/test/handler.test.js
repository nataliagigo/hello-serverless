const handler = require('../api/handler');
const seeker = require('../api/seeker');
const buyer = require('../api/buyer');

test('must return error 500 if json request is malformed', async () => {
    let body = "{\"itemID\":\"1\",}"
    let event = {
        body: body
    };
    const data = await handler.seek(event);
    expect(data.statusCode).toBe(500);
});

test('must return 200 status code if item to search exists', async () => {
    let body = "{\"itemID\":\"1\"}"
    let event = {
        body: body
    };
    seeker.searchItem = jest.fn().mockReturnValue({ Item: {itemID: "1", itemName: "Panela"} });
    const data = await handler.seek(event);
    expect(data.statusCode).toBe(200);
});

test('must return 201 status code if item was updated', async () => {
    let body = "{\"itemID\":\"1\", \"itemCount\":\"1\"}"
    let event = {
        body: body
    };
    buyer.buyItem = jest.fn().mockReturnValue({});
    const data = await handler.buy(event);
    expect(data.statusCode).toBe(201);
});