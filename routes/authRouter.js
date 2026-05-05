const express = require('express');

const authRouter = express.Router();

// to create a user - by receiving the email only
authRouter.post('/create-a-user'); 

// to verify the user
authRouter.post('/verify-user-otp');

// check if the username is unique
authRouter.get('check-unique-username');


// enter password , username for a user
authRouter.post('/enter-user-info');

// sign in
authRouter.post('/log-in');


// sign out
authRouter.post('/log-out');

module.exports = authRouter;