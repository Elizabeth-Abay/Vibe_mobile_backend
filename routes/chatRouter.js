const express = require('express');
const TokenDecoder = require('../middleware/tokenDecoder');
const ChatController = require('../controller/ChatController');



const chatRouter = express.Router();
const chatController = new ChatController();


chatRouter.get('/get-all', TokenDecoder.accessDecode, chatController.getAllChats);
chatRouter.post('/get-single-chat', TokenDecoder.accessDecode , chatController.createOrFindChat)

module.exports = chatRouter;