const express = require('express');

const validate = require('../middleware/joiValidator');
const UserInfoSchema = require('../schemas/FirstProfileSet');
const ProfileController = require('../controller/ProfileController');
const TokenDecoder = require('../middleware/tokenDecoder');


const profileRouter = express.Router();
const profileController = new ProfileController();


// check if the username is unique
profileRouter.get('/check-unique-username', validate(UserInfoSchema.userNameTakenChecker), profileController.checkUniqueUserName);


// enter password , username for a user
profileRouter.post('/enter-user-info', validate(UserInfoSchema.userInformationFirstTime), TokenDecoder.accessDecode, profileController.enterUserInfo);



module.exports = profileRouter;
