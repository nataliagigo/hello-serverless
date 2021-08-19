'use strict';

const seeker = require('./seeker');
const buyer = require('./buyer');

module.exports.seek = async event => {
  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `There is an error reading the information: ${error.stack}` }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
  let { itemID } = requestBody;
  let item = await seeker.searchItem(itemID);
  if (item.statusCode) {
    return item;
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ item }),
    headers: { 'Content-Type': 'application/json' }
  };
};

module.exports.buy = async event => {
  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `There is an error reading the information: ${error.stack}` }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
  let { itemID, itemCount } = requestBody;
  let item = await buyer.buyItem(itemID, itemCount);
  if (item.statusCode) {
    return item;
  }
  return {
    statusCode: 201,
    headers: { 'Content-Type': 'application/json' }
  };
};
