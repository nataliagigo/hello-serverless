![Node.js CI](https://github.com/Devcognitio/hello-serverless/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/Devcognitio/hello-serverless/branch/master/graph/badge.svg?token=4Z79Z3QLY3)](https://codecov.io/gh/Devcognitio/hello-serverless)

# hello-serverless
This is an example project where we show a complete example creating, testing and deploying an AWS Lambda using Serverless Framework, NodeJS, Jest, AWS-SDK, AWS-Mock, Codecov and github actions.
For a complete guide please follow this [Medium post](https://medium.com/devco-tech-blog/how-i-developed-tested-and-automatically-deployed-an-aws-lambda-for-the-first-time).

This Lambda exposes 2 endpoints through the AWS Api Gateway. The first gets an item from a DynamoDB table and the second one updates an item from the same table.
An example set of unit tests is provided and besodes, the configuration to deploy the lambda locally and test it against a local DynamoDB instance.

## Commands:

````
  //Install all project dependencies
  >npm install
  
  //Start serverless offline mode
  >sls offline
  
  //Start local DynamoDB instance
  >sls dynamodb install
  >sls dynamodb start --migrate
````  

Inside the dynamo-commands.txt file there are some example queries to populate the database.

To execute both functions follow this example commands:
````
serverless invoke local --function seek --data "{\"body\":\"{\\\"itemID\\\": \\\"1\\\"}\"}"
serverless invoke local --function buy --data "{\"body\":\"{\\\"itemID\\\": \\\”1\\\”, \\\"itemCount\\\”: \\\"1\\\"}\”}”
````

## How I can help?
Review the issues, we hear new ideas.

## Don't know hwo we are? 
Please visit www.devco.com.co


# Team Devco.
