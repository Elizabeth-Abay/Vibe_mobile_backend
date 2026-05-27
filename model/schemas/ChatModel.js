const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    // id will be assigned automatically
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId, // <-- MongoDB ObjectId
            ref: 'User',
            required : true
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
});



const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;