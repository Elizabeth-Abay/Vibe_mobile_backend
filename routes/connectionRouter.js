const express = require('express');
const ConnectionSchema = require('../schemas/ConnectionSchemas.js');
const ConnectionController = require('../controller/ConnectionController.js');
const TokenDecoder = require('../middleware/tokenDecoder');
const validate = require('../middleware/joiValidatorConnection.js');



const connectionRouter = express.Router();


let connectionController = new ConnectionController();



connectionRouter.post('/request-connection', TokenDecoder.accessDecode, validate(ConnectionSchema.requestConnection), connectionController.requestConnection);
connectionRouter.post('/accept-connection', TokenDecoder.accessDecode, validate(ConnectionSchema.acceptConnection), connectionController.acceptConnection);
connectionRouter.post('/reject-connection', TokenDecoder.accessDecode, validate(ConnectionSchema.rejectConnection), connectionController.rejectConnection);
connectionRouter.post('/disconnect-user', TokenDecoder.accessDecode, validate(ConnectionSchema.disConnectUser), connectionController.disconnectConnection);


// GET routes for retrieving connection data
connectionRouter.get('/matched-users', TokenDecoder.accessDecode , connectionController.getMatchedConnections);
connectionRouter.get('/all-connections', TokenDecoder.accessDecode , connectionController.getAllConnections);



module.exports = connectionRouter;