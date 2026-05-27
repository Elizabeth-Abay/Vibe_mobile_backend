const MessageService = require('../service/messageService');

const messageService = new MessageService();


class MessageController {
    async getMessagesInChat(req, res, next) {
        try {
            let { id } = req.decodedAccess;

            let { chatId } = req.body;

            let result = await messageService.getMessagesInAChat({ id, chatId });

            return (result.success)
                ?
                res.status(200).json(result)
                :
                res.status(400).json(result)

        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                err.from = 'MessageController.getMessagesInChat';
            }
            next(err)
        }

    }

    async createMessage(req,res,next){

    }

    async updateMessage(req,res,next){
        
    }

    async deleteMessage(req,res,next){
        
    }

}


module.exports = MessageController;