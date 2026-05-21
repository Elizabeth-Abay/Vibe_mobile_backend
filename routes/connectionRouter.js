const express = require('express');

const { ConnectionController, getConnectionController } = require('../controller/connectionController.js');
const TokenDecoder = require('../middleware/tokenDecoder');

3
const connectionRouter = express.Router();


let connectionControllerObj = new ConnectionController();
let getConnectionControllerObj = new getConnectionController();


connectionRouter.post('/request-connection', TokenDecoder.accessDecode, connectionControllerObj.requestConnectionController);
connectionRouter.post('/accept-connection', TokenDecoder.accessDecode, connectionControllerObj.acceptConnectionController);
connectionRouter.post('/reject-connection', TokenDecoder.accessDecode, connectionControllerObj.rejectConnection);
connectionRouter.post('/disconnect-user', TokenDecoder.accessDecode, connectionControllerObj.disconnectController);
connectionRouter.post('/cancel-request', TokenDecoder.accessDecode, connectionControllerObj.cancelRequest);


// GET routes for retrieving connection data
connectionRouter.get('/matched-users', TokenDecoder.accessDecode, getConnectionControllerObj.getMatchedConnections);
connectionRouter.get('/pending-requests', TokenDecoder.accessDecode, getConnectionControllerObj.getPendingRequests);

connectionRouter.get('/sent-requests', TokenDecoder.accessDecode, getConnectionControllerObj.getSentRequests);

connectionRouter.get('/all-connections', TokenDecoder.accessDecode, getConnectionControllerObj.getAllConnections);



module.exports = connectionRouter;