const Chat = require('./schemas/ChatModel');


class ChatModel {
    async getAllChats(id) {
        try {
            let result = await Chat.find(
                // 1. Filter: Find all chats where id is in the participants array
                { participants: id },

                // 2. Projection: Shape the output data
                {
                    _id: 1, // Explicitly keep the chat _id

                    // Dynamically filter the array to return only the OTHER user's ID
                    otherParticipant: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$participants",
                                    as: "participant",
                                    cond: { $ne: ["$$participant", id] } // "Not Equal to 123"
                                }
                            },
                            0 // Grab the first (and only) item left in the filtered array
                        ]
                    }
                }
            );


            if (!result) return { success: false, reason: "Problem with Mongoose" }

            return {
                success: true,
                data: result
            }


        } catch (err) {
            err.from = 'ChatModel.getAllChats'
            throw err;
        }
    }


    async checkUserAuthorized({ id, chatId }) {
        try {
            // check if the id is part of 
            const result = await Chat.exists({
                _id: chatId,
                participants: id
            });

            return (!result) ?
                {
                    success: false, reason: "User not authorized or chat don't exist"
                }
                :
                {
                    success: true
                }

        } catch (err) {
            err.from = 'ChatModel.checkUserAuthorized'
            throw err;
        }
    }

    async findOne({ id, chatWith }) {
        try {
            const existingChat = await Chat.findOne({
                participants: {
                    $all: [id, chatWith],               // Must contain all given IDs
                    $size: 2        // Must NOT contain any extra IDs
                }
            });

            // 2. If found, just return the existing chat's ID
            return (existingChat)
                ?
                {
                    success: true,
                    isNew : false,
                    data: existingChat
                }
                :
                {
                    success: false,
                    reason: "couldn't find chat"

                }


        } catch (err) {
            err.from = 'ChatModel.findOne'
            throw err;
        }

    }

    async createOne({ id, chatWith }) {
        try {
            const newChat = await Chat.create({
                participants: [id, chatWith]
            });

            return (newChat) ?
                {
                    success: true,
                    isNew: true,
                    data : newChat
                }
                :
                {
                    success: false,
                    reason: "couldn't create chat"
                }


        } catch (err) {
            err.from = 'ChatModel.createOne'
            throw err;
        }
    }

    async findOrCreateChat({ id, chatWith }) {
        try {
            // if there is one find it else create new
            let existingChat = await this.findOne({ id, chatWith });

            if (existingChat.success) return existingChat;

            let newChat = await this.createOne({ id, chatWith });

            return newChat;


        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                err.from = 'ChatModel.findOrCreateChat'
            }
            throw err;
        }
    }

}


module.exports = ChatModel;