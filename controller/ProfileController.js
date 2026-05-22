const ProfileService = require('../service/profileService');

const profileService = new ProfileService();



class ProfileController {

    async checkUniqueUserName(req, res, next) {
        try {
            // check if unique username
            let { userName } = req.body;

            let result = await profileService.checkUniqueUserName(userName);
            // checks if user name is unique only

            return result.success ?
                res.status(200).json({ success: true }) :
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


    async settingProfilePic(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No image file provided." });
            }

            // Extract buffer data and mimetype from Multer
            const imageUrl = req.file.path;
            const userId = req.decodedAccess;


            let result = await profileService.updateProfilePic({ id: userId,  profilePicUrl: imageUrl });

            return (result.success) ?
                res.status(201).json({ message: 'Successful' }) :
                res.status(400).json(result);

        } catch (err) {
            err.from = ' AuthControllers.settingProfilePic';
            next(err);
        }
    }


    async updateNameAndBio(req, res, next) {
        try {
            let {name = '', bio = '' } = req.body;
            
            let { id } = req.decodedAccess;

            let result = await profileService.updateNameAndBio({ ud, name, bio });

            return (result.success) ? res.status(201).json({ success: true }) : res.status(400).json(result);


        } catch (err) {
            err.from = ' AuthControllers.settingProfilePic';
            next(err);
        }
    }


    async updateUserName(req, res, next) {
        try {
            let { id } = req.decodedAccess;
            let { userName } = req.body;

            let result = await profileService.updateUserName({id , userName});

            return (result.success) ? res.status(201).json({ success: true }) : res.status(400).json(result);

        } catch (err) {
            err.from = ' AuthControllers.settingProfilePic';
            next(err);
        }
    }

}


module.exports = ProfileController;