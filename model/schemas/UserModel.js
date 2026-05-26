const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'id is required to create a profile']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    blocked_users: [
        {
            type: mongoose.Schema.Types.ObjectId, // Tells Mongoose this is a database ID
            ref: 'User'
        }
    ]
})



// the model is where u attach the methods
// and the schema is there too
const User = mongoose.model('User', UserSchema);


module.exports = User;