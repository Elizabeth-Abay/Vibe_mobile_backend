const express = require('express');
const TokenDecoder = require('../middleware/tokenDecoder');
const ChatController = require('../controller/ChatController');



const chatRouter = express.Router();
const chatController = new ChatController();


chatRouter.get('/get-all', TokenDecoder.accessDecode, chatController.getAllChats);
chatRouter.get('/get-one', TokenDecoder.accessDecode , chatController.getOneChat)
chatRouter.post('/new-chat', TokenDecoder.accessDecode)
chatRouter.post('/sent-message', TokenDecoder.accessDecode)

module.exports = chatRouter;