const ChatModel = require('../model/chatModel');
const UserProfileGetter = require('../model/UserProfileGetHelper');

const chatModel = new ChatModel();

class ChatService {
    async getAllChats(id) {
        try {
            // then filter out conversations where participants include that and return chat id ,  user profile
            let result = await chatModel.getAllChats(id);

            // if data = [] then it means the user havent started chatting  
            if (!result.success || result.data.length === 0) return result;

            // else get the participants in an array and fetch their profiles

            let ids = [];

            for (chat of result.data) {
                ids.push(chat.otherParticipant)
            };


            let profiles = await UserProfileGetter.getProfileInfo(ids);

            if (!profiles.success) return profiles;


            const profileMap = new Map();
            for (const profile of profiles.data) {
                profileMap.set(profile.user_id, profile);
            }

            // 2. Combine the MongoDB chat data with the PostgreSQL profile details
            let returnedObj = [];

            for (const chat of result.data) {
                // Look up the corresponding PostgreSQL profile using the otherParticipant ID
                const matchingProfile = profileMap.get(chat.otherParticipant);

                if (matchingProfile) {
                    returnedObj.push({
                        chat_id: chat._id,
                        participant_id: chat.otherParticipant,
                        name: matchingProfile.name,
                        user_name: matchingProfile.user_name,
                        profile_url: matchingProfile.profile_url
                    });
                }
            }

            // 3. Return the fully structured payload to your controller layer
            return {
                success: true,
                data: returnedObj
            };


        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'ChatService.getAllChats';
            }
            next(err);
        }
    }

}

module.exports = ChatService;