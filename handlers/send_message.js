const AWS = require('aws-sdk')
const { connectToDb } = require('../utils/connect')
const { ConnectSchema } = require('../validations/connect')
const { SendMessage } = require('../validations/send_message')


// create an api instance to send messages
const socketApi = new AWS.ApiGatewayManagementApi({
    endpoint: 'yjd1r77igd.execute-api.us-east-2.amazonaws.com/dev',
})


// connect to db
connectToDb()

module.exports.handler = async (event) => {

    console.log("Send Message")
    console.log(JSON.stringify(event, null, 2))

    const { connectionId } = event.requestContext

    const body = JSON.parse(event.body)
    const messageBody = body.message

    console.log("messageBody ", messageBody)

    try {
        await SendMessage.validate(messageBody || {})

        if( messageBody.to ) {

            // send it to the other party
            await socketApi.postToConnection({
                ConnectionId: messageBody.to,
                Data: JSON.stringify({
                    message: messageBody,
                    event,
                })
            }).promise()

        }

    } catch(e) {
        console.log("Error Sending MEssage ", e)
        return { statusCode: 200 }
    }

    return { statusCode: 200 }
}
