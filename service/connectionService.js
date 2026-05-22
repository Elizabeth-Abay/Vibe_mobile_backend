const { graphUponConnectingAndDisconnecting } = require('../model/graphThings');
const { getRequestHandler } = require('../model/graphThings');
// we need to send the profile picture , id and username
// so get id arrays from the graph and get the pic and username from postgres
const { profileService } = require('./profileRelated.js');

let connectionGraph = new graphUponConnectingAndDisconnecting();
let requestHandlerService = new getRequestHandler();
let profileGetterServiceObj = new profileService();




const NotificationModel = require('../model/notificationModel.js');


const notificationModel = new NotificationModel();

class connectionService {
    async requestingConnection(sentInfo) {
        try {
            // sentInfo = { id , connectToId}
            let res = await connectionGraph.connectReq(sentInfo);

            return (res.success) ? { success: true } : { success: false, reason: "data base problem from requestingConnection" }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }

    }


    async acceptingConnection({ acceptorId, acceptedId }) {
        try {
            // when u accept create a row in notification table
            let result = await connectionGraph.acceptingRequest({ acceptorId, acceptedId });

            // then create a row in the notifications table for the user to see
            if (!result.succcess) return result;

            let notifying = await notificationModel.createNotifications({ noitifier_id: acceptorId, notify_to_id: acceptedId, type: 'Connection Request Accepted' });

            return notifying;


        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }

    }


    async rejectingConnection(sentInfo) {
        try {
            // { userId , rejectedId }
            let res = await connectionGraph.rejectAReq(sentInfo);

            return (res.success) ? { success: true } : { success: false, reason: "data base problem from rejectingConnection" }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }
    }


    async cancellingConnection(sentInfo) {
        try {
            // sentInfo = { userId , canceled }
            let res = await connectionGraph.cancelConnection(sentInfo);

            return (res.success) ? { success: true } : { success: false, reason: "data base problem from cancellingConnection" }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }

    }


    async disConnection(sentInfo) {
        try {
            // sentInfo = {userId , deletedId}
            let res = await connectionGraph.disConnecting(sentInfo);

            return (res.success) ? { success: true } : { success: false, reason: "data base problem from disConnection" }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }

    }


    async getMatchedConnections(sentInfo) {
        try {
            // sentInfo = { userId }
            let { userId } = sentInfo;
            console.log("userId from getMatchedConnections ", userId);
            let res = await requestHandlerService.matchedUsers({ userId });
            console.log("result from requestHandlerService.matchedUsers ", res)


            if (!res.success) {
                return {
                    success: false,
                    reason: "data base problem from getMatchedConnections"
                }
            }



            if (res.lengthMatched === 0) {
                return {
                    success: true,
                    matched: false
                }
                // matched : false means there is no one who shares an interest with u
            }


            let resultArr = res.data || [];

            // bc the user may not be matched
            // the resultArr = [ { userId , sharedInterests : [ 'football' , 'basketball']}]
            // collect their id
            let matchedPPlID = resultArr.map(
                match => (match.userId)
            );

            let profiles = [];
            if (matchedPPlID.length !== 0) {
                profiles = await profileGetterServiceObj.getProfileService({ userIds: matchedPPlID }) || [];
            }

            if (profiles.length === 0) {
                return {
                    success: false,
                    reason: "Profile length is 0"
                }
            }

            // profiles = [ {path , username , id } ]
            // what if users have are matched but they dont have a profile yet 
            // path will be null and that will be handled by the front end
            console.log("profiles ", profiles)

            // attach the shared interests to the profiles array objects
            for (let pp of profiles.data) {
                // get the key and look for the shared interest
                let id = pp.id;
                // then get the value from the array with simmilar id
                let item = resultArr.find(
                    r => r.userId === id
                );

                pp.sharedInterests = (item && item.sharedInterests) ? item.sharedInterests : [];
            }

            // profiles = [ { path , username , id , sharedInterests }]

            return {
                success: true,
                profiles
            };

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }
    }


    async getPendingRequests(id) {
        try {
            let res = await requestHandlerService.pendingRequests(id);

            if (!res.success) return { succcess: false, reason: "Pending request fetching problem" }


            if (res.data.length === 0) return {
                success: true, profiles: []
            }


            // then get their profile information from the array sent
            let profiles = await profileGetterServiceObj.getProfileService({ userIds: res.data })

            return (profiles.success) ? { success: true, profiles: profiles.data } : { succcess: false, reason: "Profile fetching problem" }
            // we need profile pictures and id
        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }
    }

    async getSentRequests(id) {
        try {
            let res = await requestHandlerService.sentOutRequests(id);
            // get their profile from the method
            // this will give us the array of user ids

            if (!res.success) return {
                success: false,
                reason: "data base problem from getSentRequests"
            }



            let profiles = await profileGetterServiceObj.getProfileService({ userIds: res.data })
            // the profiles.data = array of { path , username , id  }

            if (profiles.success) {
                return {
                    success: true,
                    profiles: profiles.data
                }

            }

            return { succcess: false, reason: "Couldnt fetch the profiles" }
        }
        catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }
    }


    async getAllConnections(id) {
        try {
            let res = await requestHandlerService.allConnected(id);

            if (!res.success) return {
                success: false,
                reason: "data base problem from getAllConnections"
            }


            let profiles = await profileGetterServiceObj.getProfileService({ userIds: res.data });

            return (profiles.success) ? {
                success: true,
                profiles: profiles.data
            } : {
                success: false,
                reason: "problems on profileGetterServiceObj.getProfileService from getAllConnections"
            }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }
    }
}



module.exports = { getMatchedConnectionsService, connectionService };


