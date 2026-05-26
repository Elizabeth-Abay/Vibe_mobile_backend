const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    // id will be assigned automatically
    participants: [
        {
            type: String, // Pointing to your user identifiers (like your sync'd IDs)
            required: true
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
});



const Chat = mongoose.model('Chat' , ChatSchema);

module.exports = Chat;