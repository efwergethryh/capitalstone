const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required:true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create a Mongoose model from the schema
const Message = mongoose.model('message', messageSchema);

module.exports = Message;
