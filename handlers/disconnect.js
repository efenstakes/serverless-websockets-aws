const AWS = require('aws-sdk')


const SocketConnections = require("../models/connection");
const { connectToDb } = require("../utils/connect");



// connect to db
connectToDb()


module.exports.handler = async (event) => {

    console.log("User DisConnected")
    console.log(event)

    // get connection id
    const { connectionId } = event.requestContext

    // delete the connection from db
    await SocketConnections.deleteOne({ connectionId, })

    return { statusCode: 200 }
}
