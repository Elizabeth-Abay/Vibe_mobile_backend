const ProfileService = require('../service/profileService');



class ProfileController {
    async enterUserInfo(req, res, next) {
        try {
            // username and password

        } catch (err) {
            err.from = ' AuthControllers.enterUserInfo';
            next(err);
        }
    }


    async checkUniqueUserName(req, res, next) {
        try {
            // username and password

        } catch (err) {
            err.from = 'AuthControllers.checkUniqueUserName';
            next(err);
        }
    }
}


module.exports = ProfileController;