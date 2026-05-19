const express = require('express');
const TokenDecoder = require('../middleware/tokenDecoder');
const InterestController = require('../controller/InterestController');

const interestRouter = express.Router();
const interestController = new InterestController();

interestRouter.post('/put-in-interests', TokenDecoder.accessDecode, interestController.firstTimeLinking);

interestRouter.post('/update-interests', TokenDecoder.accessDecode, interestController.updatingLinks);


interestRouter.get('/get-interests', TokenDecoder.accessDecode, interestController.getUserInterests);


module.exports = interestRouter;