const AWS = require('aws-sdk')


const SocketConnections = require("../models/connection");
const { connectToDb } = require("../utils/connect");
const { ConnectSchema } = require('../validations/connect');

// create an api instance to send messages
const socketApi = new AWS.ApiGatewayManagementApi({
    endpoint: 'yjd1r77igd.execute-api.us-east-2.amazonaws.com/dev',
})

// connect to db
connectToDb()


module.exports.handler = async (event) => {

    console.log("New Connection")
    console.log(event)

    const { connectionId } = event.requestContext
    const queryData = event.queryStringParameters

    if( !queryData ) {
        return { statusCode: 400 }
    }
    
    // add it to mongodb
    try {
        await ConnectSchema.validate({ ...queryData })

        const newConnection = new SocketConnections({ connectionId, userId: queryData?.name })
        await newConnection.save()

    } catch (error) {
        console.log("Save error Or data error ", error)
        return { statusCode: 400 }
    }

    return {
        statusCode: 200,
    }
}
