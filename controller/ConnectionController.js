// when creating connection two things - userId from decodedAccess and the other user's id from req.body

const { connectionService } = require('../service/connectionService.js');
const { getMatchedConnectionsService } = require('../service/connectionService.js');


let connServiceObj = new connectionService();
let getConnectionsServiceObj = new getMatchedConnectionsService();


class ConnectionController {
    async requestConnectionController(req, res) {
        try {
            let { id } = req.decodedAccess;

            let { connectToId } = req.body;

            let result = await connServiceObj.requestingConnection({ id, connectToId });

            return (result.success) ? res.status(200).json({ success: true }) : res.status(400).json(result);

        } catch (err) {
            err.from = 'ConnectionController.requestConnectionController';
            next(err);
        }
    }

    async acceptConnectionController(req, res) {
        try {
            // {acceptorId , acceptedId }
            let { id } = req.decodedAccess;
            let { acceptedId } = req.body;

            let result = await connServiceObj.acceptingConnection({ acceptorId: id, acceptedId });

            return (result.success) ? res.status(200).json({ success: true }) : res.status(400).json(result);
        
        } catch (err) {
            err.from = 'ConnectionController.acceptConnectionController';
            next(err);
        }
    }

    async rejectConnection(req, res) {
        try {
            // { userId , rejectedId }
            let { id } = req.decodedAccess;
            let { rejectedId } = req.body;

            let result = await connServiceObj.rejectingConnection({ rejectorId: id, rejectedId });

            return (result.success) ? res.status(200).json({ success: true }) : res.status(400).json(result);

        } catch (err) {
            err.from = 'ConnectionController.rejectConnection';
            next(err);
        }
    }


    async cancelRequest(req, res) {
        try {
            // { userId , canceled }
            let { id } = req.decodedAccess;
            let { canceled } = req.body;
            let result = await connServiceObj.cancellingConnection({ userId, canceled });

            return (result.success) ? res.status(200).json({ success: true }) : res.status(400).json(result);

        } catch (err) {
            err.from = 'ConnectionController.cancelRequest';
            next(err);
        }

    }


    async disconnectController(req, res) {
        try {
            // {userId , deletedId}
            let { id } = req.decodedAccess;
            let { deletedId } = req.body;
            let result = await connServiceObj.disConnection({ userId, deletedId });

            return (result.success) ? res.status(200).json({ success: true }) : res.status(400).json(result);

        } catch (err) {
            err.from = 'ConnectionController.disconnectController';
            next(err);
        }
    }


    async getAllConnections(req, res) {
        try {
            let { id } = req.decodedAccess;
            let result = await getConnectionsServiceObj.getAllConnections({ userId: id });

            return (result.success) ? res.status(200).json(result) : res.status(400).json(result);

        } catch (err) {
            err.from = 'ConnectionController.getAllConnections';
            next(err);
        }
    }

    async getSentRequests(req, res) {
        try {
            let { id } = req.decodedAccess;
            let result = await getConnectionsServiceObj.getSentRequests({ userId: id });

            return (result.success) ? res.status(200).json(result) : res.status(400).json(result);

        } catch (err) {
            err.from = 'ConnectionController.getSentRequests';
            next(err);
        }
    }

    async getMatchedConnections(req, res) {
        try {
            // console.log("req.decodedAccess from getMachedCOnn " , req.decodedAccess)
            let { id } = req.decodedAccess;
            let result = await getConnectionsServiceObj.getMatchedConnections({ userId: id });

            if (result.success && !result.matched) return res.status(200).json({ data: [] });

            return (result.success) ? res.status(200).json(result.profiles) : res.status(400).json(result);

        } catch (err) {
            err.from = 'ConnectionController.getMatchedConnections';
            next(err);
        }
    }

    async getPendingRequests(req, res) {
        try {
            let { id } = req.decodedAccess;
            let result = await getConnectionsServiceObj.getPendingRequests({ userId: id });


            return (result.success) ? res.status(200).json(result) : res.status(400).json(result);


        } catch (err) {
            err.from = 'ConnectionController.getPendingRequests';
            next(err);
        }
    }
}


module.exports = ConnectionController

