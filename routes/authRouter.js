const express = require('express');

const authRouter = express.Router();


authRouter.post('/create-a-user');
authRouter.post('/verify-user');
authRouter.post('/enter-user-info');
authRouter.get('check-unique-username');
authRouter.post('/log-in');
authRouter.post('/log-out');

module.exports = authRouter;