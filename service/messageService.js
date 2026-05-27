const MessageModel = require('../model/messageModel');
const UserProfileGetter = require('../model/UserProfileGetHelper');
const ChatService = require('./chatService');


const messageModel = new MessageModel();
const chatService = new ChatService();


class MessageService {
    async getMessagesInAChat({ id, chatId }) {
        try {
            // in the model I want to find 30 messages and profile picture of the user
            let isUserAuthorized = await chatService.isUserAuthorized({ id, chatId });


            if (!isUserAuthorized.success) return isUserAuthorized;

            let messages = await messageModel.getMessagesInAChat({ id, chatId });

            if (!messages.success) return messages;

            // but what if there is no messages yet - then the array will be empty
            // loop through the array to classify images and also get profile urls

            let { data } = messages;

            if (data.length === 0) return { success: true, data: [] }
            // meaning there have not been any messages

            let returnedList = [];
            let usersProfileUrl;
            let otherUserProfileUrl;

            for (msg of data) {
                // setting up the message structure
                if (msg.sender_id === id) {
                    if (!usersProfileUrl) {
                        let result = await UserProfileGetter.getProfileInfo([id]);

                        if (!result.success) return result;

                        usersProfileUrl = result.data;

                    }

                    returnedList.push({
                        mine: true,
                        profileUrl: usersProfileUrl.profile_url,
                        name: usersProfileUrl.name,
                        userName: usersProfileUrl.user_name,
                        msgId: msg._id,
                        text: msg.text,
                        createdAt: msg.created_at
                    })
                }
                else {
                    // then it is the other person's message

                    if (!otherUserProfileUrl) {
                        let result = await UserProfileGetter.getProfileInfo([msg.sender_id]);

                        if (!result.success) return result;

                        otherUserProfileUrl = result.data;

                    }

                    returnedList.push({
                        mine: false,
                        profileUrl: otherUserProfileUrl.profile_url,
                        name: otherUserProfileUrl.name,
                        userName: otherUserProfileUrl.user_name,
                        msgId: msg._id,
                        text: msg.text,
                        createdAt: msg.created_at
                    })

                }

            }


            let sentObj = {
                otherPersonProfile: otherUserProfileUrl,
                messages: returnedList
            }


            return {
                success: true,
                data: sentObj
            }


        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'ChatService.getMessagesInAChat';
            }
            throw err;
        }
    }


    async updateMessage({ id, msgId, newMessage, chatId }) {
        try {
            // u can only update ur message
            // in the model I want to find 30 messages and profile picture of the user
            let isUserAuthorized = await chatService.isUserAuthorized({ id, chatId });


            if (!isUserAuthorized.success) return isUserAuthorized;

            let result = await messageModel.updateMessage({ id, msgId, newMessage });

            // return result either way - if successfull = { success : true , data}
            //   else { success : false , reason}

            return result;


        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'ChatService.updateMessage';
            }
            throw err;
        }
    }



    async deleteMessage({ id, msgId }) {
        try {
            // u can only delete ur message
            let isUserAuthorized = await chatService.isUserAuthorized({ id, chatId });


            if (!isUserAuthorized.success) return isUserAuthorized;

            let result = await messageModel.deleteMessage({ id, msgId });

            return result;
        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'ChatService.deleteMessage';
            }
            throw err;
        }
    }


    async createMessage({ id, message, chatId }) {
        try {
            let isUserAuthorized = await chatService.isUserAuthorized({ id, chatId });


            if (!isUserAuthorized.success) return isUserAuthorized;

            let result = await messageModel.createMessage({ id, message, chatId });

            return result;


        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'ChatService.createMessage';
            }
            throw err;
        }
    }

}


module.exports = MessageService;