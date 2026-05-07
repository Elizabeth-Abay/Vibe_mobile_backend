const ProfileModel = require('../model/profileModel');

const profileModel = new ProfileModel();

class ProfileService {
    async checkUniqueUserName(userName) {
        try {
            let result = await profileModel.checkUniqueUserName(userName);

            return result;

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.checkUniqueUserName';
            }
            throw err;
        }
    }

    async enterUserInfo({ id, name, userName, password }) {
        try {
            let result = await profileModel.settingProfile({ id, name, userName, password });

            return result;

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.enterUserInfo';
            }
            throw err;
        }
    }

}

module.exports = ProfileService;