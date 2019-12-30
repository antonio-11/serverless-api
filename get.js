const dynamo = require('./dynamoDb');

export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  //const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  dynamo.getNote(params, callback);
}