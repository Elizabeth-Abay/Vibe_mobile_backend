const express = require('express');
const TokenDecoder = require('../middleware/tokenDecoder');

const interestRouter = express.Router();

interestRouter.post('/put-in-interests' , TokenDecoder.accessDecode , );


interestRouter.get('/get-interests' , TokenDecoder.accessDecode  ,);


module.exports = interestRouter;