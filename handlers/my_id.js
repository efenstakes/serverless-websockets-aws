const AWS = require('aws-sdk')

// create an api instance to send messages
const socketApi = new AWS.ApiGatewayManagementApi({
    endpoint: 'yjd1r77igd.execute-api.us-east-2.amazonaws.com/dev',
})

module.exports.handler = async (event) => {
    console.log("Get My Id")
    console.log(event)

    const { connectionId } = event.requestContext

    await socketApi.postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify({
            connectionId,
        })
    }).promise()

    return { statusCode: 200 }
}
