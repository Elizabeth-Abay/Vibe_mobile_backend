class RequestController {
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


    async getSentRequests(req, res) {
        try {
            let { id } = req.decodedAccess;
            let result = await getConnectionsServiceObj.getSentRequests(id);

            return (result.success) ? res.status(200).json(result) : res.status(400).json(result);

        } catch (err) {
            err.from = 'ConnectionController.getSentRequests';
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



module.exports = RequestController;