const mongoose = require('mongoose');

const socketConnectionsSchema = new mongoose.Schema({
    connectionId: { type: String, required: true },
    userId: { type: String, required: true },
}, { timestamps: false })

module.exports = mongoose.model('SocketConnections', socketConnectionsSchema)

