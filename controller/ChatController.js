const ChatService = require('../service/chatService');

const chatService = new ChatService();

class ChatController {
    async getAllChats(req, res, next) {
        try {
            let { id } = req.decodedAccess;

            let result = await chatService.getAllChats(id);

            return (result.success) ?
                res.status(200).json(result)
                :
                res.status(400).json(result)

        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'ChatController.getAllChats';
            }
            next(err);
        }
    }


    async getOneChat(req, res, next) {
        try {
            let { id } = req.decodedAccess;

            let result = await chatService.getOneChat(id);


        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'ChatController.getOne';
            }
            next(err);
        }
    }
}


module.exports = ChatController;