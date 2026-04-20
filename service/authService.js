const errorNotifier = require('../utils/errorNotifier');
// from , message

class AuthService {
    async createUser(sentInfo) {
        try {
            // check if user exist , generate and hash otp, send them email 

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }

    }

    async verifyUser(sentInfo) {
        try {
            // get Otp and hash and compare it

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.verifyUser';
            }
            throw err;
        }
    }

    async enterUserInfo(sentInfo) {
        try {

        }catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.enterUserInfo';
            }
            throw err;
        }
    }

    async checkUniqueUserName(sentInfo) {
        try {

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.checkUniqueUserName';
            }
            throw err;
        }
    }

    async logIn(sentInfo) {
        try {

        }catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.logIn';
            }
            throw err;
        }
    }

    async logOut(sentInfo) {
        try {

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.logOut';
            }
            throw err;
        }

    }
}
