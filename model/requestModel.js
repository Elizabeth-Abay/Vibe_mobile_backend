class RequestHandler {

    // their own info and other ppl info using pg
    // all connected with them
    // all pending req
    // all requests they sent out
    // all their friends  - ie the main part
    async allConnected(id) {
        try {
            // seek out all ppl connected to the user

            let query = `
                MATCH (n:Person) WHERE n.id = $id 
                MATCH (n)-[r:Connected]-(x:Person)
                RETURN x.id
                `;

            let res = await sessionToRead.executeRead(
                query, { id }
            )

            if (res.records.length === 0) return {
                // this means u havent connected to a user
                success: true,
                reason: "Data base search is empty",
                data: []
            }



            let connectedUserIds = res.records.map(
                r => r.get('x.userId')
            )

            return {
                success: true,
                data: connectedUserIds
            }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            err.from = 'RequestHandler.allConnected';
            throw err;
        }
    }

    async pendingRequests(id) {
        try {
            // requests sent to the user

            let query = `
                MATCH (n:Person) WHERE n.id = $id 
                MATCH (n)<-[r:request_Connect]-(x:Person)
                RETURN x.id
                `;

            let res = await sessionToRead.executeRead(
                tx => {
                    return tx.run(
                        query, { id }
                    )
                }
            )

            if (res.records.length === 0) return {
                success: true,
                reason: "Data base search is empty",
                data: []
            }


            // convert the value to an array
            let userIds = res.records.map(
                r => r.get('x.userId')
            );

            return {
                success: true,
                data: userIds
            }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            err.from = 'RequestHandler.pendingRequests';
            throw err;
        }
    }

    async sentOutRequests(id) {
        try {
            // then seek out ppl the user requested to connect to

            let query = `
                MATCH (n:Person) WHERE n.id = $id 
                MATCH (n)-[r:request_Connect]->(x:Person)
                RETURN x.id
                `;

            let res = await sessionToRead.executeRead(
                query, { id }
            )

            if (res.records.length === 0) return {
                success: true,
                reason: "Data base search is empty",
                data: []
            }

            let sentOutReq = res.records.map(
                rec => {
                    return rec.get('x.id')
                }
            )

            // sentOutReq - will be an array of userIds

            return {
                success: true,
                data: sentOutReq
            }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            err.from = 'RequestHandler.sentOutRequests';
            throw err;
        }
    }

    async matchedUsers(id) {
        try {
            // to match users we need to do a weighted search
            // first get users interest by number
            // and then half it up and find all users that havev >= 1/2 of that
            // return the users with most shared interests
            let queryToMatch = `
                MATCH 
                    (u1:Person {id : $id })-[r1:INTERESTED_IN]->(i:Interest)<-[r2:INTERESTED_IN]-(u2:Person)
                WHERE u1 <> u2
                    AND NOT (u1)-[:request_Connect]-(u2)
                WITH u2, 
                    SUM( r1.rated_as * r2.rated_as ) AS matchScore,
                    collect(i.name) AS sharedInterests
                RETURN u2.id AS matchedUserId , sharedInterests
                ORDER BY matchScore DESC
                LIMIT 50
            `
            // the first line will get all share interest bn users
            // SUM (r1.rated_as * r2.rated_as) - will be the total score
            // we use with to return many things at once 

            let res = await sessionToRead.executeRead(
                tx => {
                    return tx.run(
                        queryToMatch, { id }
                    )
                }
            )

            if (!res) return {
                success: false
            }


            if (res.records.length === 0) {
                return {
                    success: true,
                    data: []
                }
            }

            // res.records is an array
            // so we can use .map method on it
            let matchedUsers = res.records.map(record => ({
                userId: record.get('matchedUserId'),
                sharedInterests: record.get('sharedInterests')
            }));


            // matchedUsers = [ { userId , sharedInterests }]

            return {
                success: true,
                data: matchedUsers
            }


        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            err.from = 'RequestHandler.matchedUsers';
            throw err;
        }
    }

}



module.exports = RequestHandler