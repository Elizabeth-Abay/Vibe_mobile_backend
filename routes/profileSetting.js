const express = require('express');

const validate = require('../middleware/joiValidator');
const UserInfoSchema = require('../schemas/FirstProfileSet');
const ProfileController = require('../controller/ProfileController');
const TokenDecoder = require('../middleware/tokenDecoder');
const ProfileUpdateSchema = require('../schemas/ProfileUpdateSchema');
const uploads = require('../config/multerConfig');


const profileRouter = express.Router();
const profileController = new ProfileController();


// check if the username is unique
profileRouter.get('/check-unique-username', validate(UserInfoSchema.userNameTakenChecker), TokenDecoder.accessDecode, profileController.checkUniqueUserName);


// enter password , username for a user
profileRouter.post('/enter-user-info-first-time', validate(UserInfoSchema.userInformationFirstTime), TokenDecoder.accessDecode, profileController.enterUserInfo);


// set up profile picture
profileRouter.post('/set-profile-picture', uploads.single('profilePic'), validate(ProfileUpdateSchema.updateProfilePic), TokenDecoder.accessDecode, profileController.settingProfilePic);


profileRouter.post('/set-bio-and-name', validate(ProfileUpdateSchema.updateBioAndName), TokenDecoder.accessDecode, profileController.updateNameAndBio);


profileRouter.post('/set-user-name', validate(ProfileUpdateSchema.updateUserName) , TokenDecoder.accessDecode, profileController.updateUserName)



module.exports = profileRouter;
