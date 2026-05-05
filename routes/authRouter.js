const express = require('express');
const AuthSchemas = require('../schemas/AuthSchemas');
const validate = require('../middleware/joiValidator');

const authRouter = express.Router();

// to create a user - by receiving the email only
authRouter.post('/create-a-user' , validate(AuthSchemas.registrationChecker));

// to verify the user
authRouter.post('/verify-user-otp' , validate(AuthSchemas.verifyUserOtp));

// check if the username is unique
authRouter.get('check-unique-username' , validate(AuthSchemas.userNameTakenChecker));


// enter password , username for a user
authRouter.post('/enter-user-info' , validate(AuthSchemas.userInformationFirstTime));

// sign in
authRouter.post('/log-in' , validate(AuthSchemas.logInValidator));


// sign out
authRouter.post('/log-out' , validate(AuthSchemas));

module.exports = authRouter;