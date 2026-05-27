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
}


module.exports = ChatModel;