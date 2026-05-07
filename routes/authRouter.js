const express = require('express');
const AuthSchemas = require('../schemas/AuthSchemas');
const validate = require('../middleware/joiValidator');
const AuthController = require('../controller/AuthController');

const authRouter = express.Router();
const authController = new AuthController();


// to create a user - by receiving the email only
authRouter.post('/create-a-user' , validate(AuthSchemas.registrationChecker) , authController.createUser);

// to verify the user
authRouter.post('/verify-user-otp' , validate(AuthSchemas.verifyUserOtp) , authController.verifyUserOtp);

// check if the username is unique
authRouter.get('check-unique-username' , validate(AuthSchemas.userNameTakenChecker) , authController.checkUniqueUserName);


// enter password , username for a user
authRouter.post('/enter-user-info' , validate(AuthSchemas.userInformationFirstTime) , authController.enterUserInfo);

// sign in
authRouter.post('/log-in' , validate(AuthSchemas.logInValidator) , authController.logIn);


// sign out 
// // TO DO :  IMPLEMENT 
authRouter.post('/log-out' , authController.logOut );

module.exports = authRouter;