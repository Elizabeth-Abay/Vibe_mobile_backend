const ProfileService = require('../service/profileService');

const profileService = new ProfileService();



class ProfileController {

    async checkUniqueUserName(req, res, next) {
        try {
            // check if unique username
            let { userName } = req.body;

            let result = await profileService.checkUniqueUserName(userName);

            return result.success ?
                res.status(201).json({ success: true }) :
                res.status(400).json({ success: false });

        } catch (err) {
            err.from = 'AuthControllers.checkUniqueUserName';
            next(err);
        }
    }

    async enterUserInfo(req, res, next) {
        try {
            // username and password
            let { id } = req.decodedAccess;

            let { userName, password, name } = req.body;

            let result = await profileService.enterUserInfo({ id, name, userName, password });

            return result.success ?
                res.status(201).json({ success: true }) :
                res.status(400).json({ success: false });

        } catch (err) {
            err.from = ' AuthControllers.enterUserInfo';
            next(err);
        }
    }


}


module.exports = ProfileController;