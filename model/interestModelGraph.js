class InterestModelG {
    async linkingUserWithInterests(sentInfo) {
        try {
            // query - interests = [ { name , rated_as }]
            // then u will have it unwind - ie separate the object 
            // interest - will be the current item
            const query = `
                MATCH (n:Person {id: $id})
                UNWIND $interests AS interest
                MATCH (i:Interest {name: interest.name})
                MERGE (n)-[r:INTERESTED_IN ]->(i)
                SET r.rated_as = interest.rated_as
                RETURN n, collect(r) AS relationships
            `;
            // since interests is an array of objects
            // unwind will run the query below it once for every object termed as interest


            let result = await sessionToWrite.executeWrite(
                tx => {
                    return tx.run(
                        query, sentInfo
                    )
                }

            )


            return (result.records[0]?.length === 0) ? { success: false } : { success: true }
           

        } catch (err) {
            console.log("Error while GraphActivities.linkingUserWithInterests ", err.message);

            return {
                success: false,
                reason: "Error while GraphActivities.linkingUserWithInterests"
            }
        }
    }

    async updatingLinksOfInterests(sentInfo) {
        try {
            // sentInfo = { userId , interests : [ { name , rated_as }]}
            // first delete all the links
            // then recreate them

            let queryToDel = `
            MATCH (n:Person) WHERE n.userId = $userId
            MATCH (n)-[r:INTERESTED_IN]->()
            DELETE r
            RETURN n
            `

            let delRes = await sessionToWrite.executeWrite(
                tx => {
                    return tx.run(
                        queryToDel, sentInfo
                    )

                }
            )

            if (delRes.records[0]?.length === 0) {
                return {
                    success: false,
                    reason: "Database issue while deleting old interest links"
                }
            }

            let res = this.linkingUserWithInterests(sentInfo);
            // recreate interest links

            return res;

        } catch (err) {
            console.log("Error while GraphActivities.updatingLinksOfInterests ", err.message);
            return {
                success: false,
                reason: "Error while GraphActivities.updatingLinksOfInterests"
            }



        }
    }

    async gettingAllInterest(sentInfo) {
        try {
            let { userId } = sentInfo;
            // we want to get all names of nodes which are linked by interested_in
            let query = `
            MATCH (u:Person) WHERE u.userId = $userId
            MATCH (u)-[r:INTERESTED_IN]->(i)
            RETURN collect(i.name) , collect(r.rated_as)
            `

            let res = await sessionToRead.executeRead(
                tx => {
                    return tx.run(
                        query, { userId }
                    )
                }
            )
            // res.records[0]._fields this is an array made up of 2 arrays 
            // the front end only needs the [{ name , rated_as}]
            // so loop through both arrays in the service layer  

            return {
                success: true,
                data: res.records[0]._fields
            }

        } catch (err) {
            console.log("Error while GraphActivities.gettingAllInterest ", err.message);
            return {
                success: false,
                reason: "Error while GraphActivities.gettingAllInterest"
            }



        }
    }
}