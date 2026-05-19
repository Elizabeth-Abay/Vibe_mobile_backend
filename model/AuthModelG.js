const driver = require('../config/neo4jConfig');


const session = driver.session();

const sessionToWrite = driver.session({
    defaultAccessMode: session.WRITE
})



class AuthModelGraph {
    async createGraphNode(id) {
        try {
            // create a node
            let res = await sessionToWrite.executeWrite(
                tx => {
                    return tx.run(
                        `CREATE (n:Person { id : $id }) RETURN n`,
                        {
                            id
                        }
                    )
                }
            )


            return {
                success: true
            }
        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthModelGraph.createGraphNode';
            }
            throw err;
        }

    }
}


module.exports = AuthModelGraph;
