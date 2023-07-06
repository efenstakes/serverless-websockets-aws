const AWS = require('aws-sdk')
const { connectToDb } = require('../utils/connect')
const { ConnectSchema } = require('../validations/connect')

const SocketConnections = require("../models/connection");

// create an api instance to send messages
const socketApi = new AWS.ApiGatewayManagementApi({
    endpoint: 'yjd1r77igd.execute-api.us-east-2.amazonaws.com/dev',
})

// connect to db
connectToDb()

module.exports.handler = async (event) => {

    console.log("Get Connection Ids")
    console.log(JSON.stringify(event, null, 2))

    console.log("event ", event)
    console.log("event.body ", event.body)

    const { connectionId } = event.requestContext

    try {
        const body = JSON.parse(event.body)
        const userIds = body?.users || []
        console.log("body ", body)
        console.log("userIds ", userIds)

        console.log("userIds.length ", userIds.length)
        if( userIds.length === 0 ) {
            console.log("no user ids so userIds  if( users.length === 0 ) { ", userIds)
            return { statusCode: 200 }
        }

        const result = await SocketConnections.find({ userId: { $in: userIds } }, { _id: false, __v: false }).lean()
        // const result = await SocketConnections.find({}).lean()
        console.log("result ", result)

        // send connectionIds back
        await socketApi.postToConnection({
            ConnectionId: connectionId,
            Data: JSON.stringify({
                connectionIds: result,
                result,
                body: event.body,
            })
        }).promise()

    } catch(e) {
        console.log("Error Getting Connection Ids ", e)
        return { statusCode: 400 }
    }

    return { statusCode: 200 }
}
