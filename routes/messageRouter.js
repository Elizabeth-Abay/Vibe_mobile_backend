const express = require('express');
const TokenDecoder = require('../middleware/tokenDecoder');
const MessageController = require('../controller/messageController');

const messageRouter = express.Router();
const messageController = new MessageController();


messageRouter.get('/get-messages', TokenDecoder.accessDecode,messageController.getMessagesInChat);
messageRouter.post('/send-message', TokenDecoder.accessDecode,messageController.createMessage);
messageRouter.post('/update-message', TokenDecoder.accessDecode,messageController.updateMessage);
messageRouter.post('/delete-message', TokenDecoder.accessDecode,messageController.deleteMessage);

module.exports = messageRouter;