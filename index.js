const connectHandler = require("./handlers/connect")
const disconnectHandler = require("./handlers/disconnect")
const defaultHandler = require("./handlers/default")
const getConnectionIdsHandler = require("./handlers/get_connection_ids")
const myIdHandler = require("./handlers/my_id")
const sendMessageHandler = require("./handlers/send_message")

module.exports.connect = connectHandler.handler
module.exports.disconnect = disconnectHandler.handler
module.exports.default = defaultHandler.handler
module.exports.getConnectionIds = getConnectionIdsHandler.handler
module.exports.myId = myIdHandler.handler
module.exports.sendMessage = sendMessageHandler.handler
