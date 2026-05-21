class GraphConnection {
    async connectReq(sentInfo) {
        try {
            // sentInfo = { id , connectToId}
            let query = `
                MATCH (requester:Person) WHERE requester.id = $id
                MATCH (requested:Person) WHERE requested.id = $connectToId
                MERGE (requester)-[r:request_Connect]->(requested)
                ON CREATE SET r.created_At = ${Date.now()}
                RETURN requester , r , requested
            `

            let res = await sessionToWrite.executeWrite(
                tx => {
                    return tx.run(
                        query, sentInfo
                    )
                }
            )

            let returnedVals = res.records[0]?.length;

            return (returnedVals === 0) ? { success: false, reason: "Database issue" } : { success: true }

        } catch (err) {
            err.from = 'GraphConnection.connectReq';
            next(err);
        }

    }

    async rejectAReq(sentInfo) {
        try {
            // sentInfo = { userId , rejectedId }
            let query = `
                MATCH (requestor:Person)  WHERE requestor.userId = $rejectedId
                MATCH (rejector:Person)  WHERE rejector.userId = $userId
                MATCH (requestor)-[r:request_Connect]->(rejector)
                DETACH DELETE r
                RETURN rejector
            `

            let result = await sessionToWrite.executeWrite(
                tx => {
                    return tx.run(
                        query, sentInfo
                    )
                }
            )

            let res = result.records[0]?.length;

            return (res === 0) ? {
                success: false,
                reason: "Error in the database"
            }
                :
                {
                    success: true
                }

        } catch (err) {
            err.from= "GraphConnection.rejectAReq";
            next(err);
        }
    }


    async cancelConnection(sentInfo) {
        try {
            // sentInfo = { userId , canceled }
            let query = `
                MATCH (requestor:Person)  WHERE requestor.userId = $userId
                MATCH (requested:Person)  WHERE requested.userId = $canceled
                MATCH (requestor)-[r:request_Connect]->(requested)
                DETACH DELETE r
                RETURN requestor
            `

            let result = await sessionToWrite.executeWrite(
                tx => {
                    return tx.run(
                        query, sentInfo
                    )
                }
            )

            let res = result.records[0]?.length;

            return (res === 0) ?
                {
                    success: false, reason: "Error in the database"
                }
                :
                { success: true }

        } catch (err) {
            err.from = 'GraphConnection.cancelConnection';
            next(err);
        }

    }

    async acceptingRequest(sentInfo) {
        try {
            // sentInfo = {acceptorId , acceptedId }
            let query = `
                MATCH (accpetor:Person) WHERE accpetor.userId = $acceptorId
                MATCH (accepted:Person) WHERE accepted.userId = $acceptedId
                MATCH (accepted)-[r:request_Connect]->(accpetor)
                MERGE (accepted)-[c:Connected]->(accpetor)
                ON CREATE SET c.since = ${Date.now()}
                DETACH DELETE r
                RETURN accepted , accpetor
            `


            let result = await sessionToWrite.executeWrite(
                tx => {
                    return tx.run(
                        query, sentInfo
                    )
                }


            )

            let res = result.records[0]?.length;

            return (res === 0) ?
                {
                    success: false,
                    reason: "Error in the database"
                }
                :
                {
                    success: true
                }



        } catch (err) {
            err.from = 'GraphConnection.acceptingRequest';
            next(err);
        }

    }

    async disConnecting(sentInfo) {
        try {
            // sentInfo = {userId , deletedId}
            let query = `
                MATCH (disconnector:Person) WHERE disconnector.userId = $userId
                MATCH (disconnected:Person) WHERE disconnected.userId = $disconnectedId
                MATCH (disconnector)-[r:Connected]-(disconnected)
                DETACH DELETE r
                RETURN disconnected
            `


            let result = await sessionToWrite.executeWrite(
                tx => {
                    return tx.run(
                        query, sentInfo
                    )
                }
            )

            let res = result.records[0]?.length;

            return (res === 0) ?
                {
                    success: false,
                    reason: "Error in the database"
                }
                :
                {
                    success: true
                }

        } catch (err) {
            err.from = 'GraphConnection.disConnecting';
            next(err);
        }

    }
}


module.exports = GraphConnection;



