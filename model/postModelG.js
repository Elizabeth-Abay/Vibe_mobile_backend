const driver = require('../config/neo4jConfig');

const session = driver.session();

const sessionToWrite = driver.session({
    defaultAccessMode: session.WRITE
})

const sessionToRead = driver.session({
    defaultAccessMode: session.READ
})

class PostModelG {
    async selectPostsBasedOnCategory(categorySelected) {
        try {
            const query = `
                MATCH (p:Post)-[:BELONGS_TO]->(c:Category {category: $categorySelected})
                RETURN collect(p.id) AS postIds`;

            let result = await sessionToRead.run(
                tx => {
                    return tx.run(
                        query, { categorySelected }
                    )
                }
            );

            // before extracting check
            if (result.records.length === 0) {
                return res.json({ success: true, data: [] });
            }


            const postIdsArray = result.records[0].get('postIds');

            return {
                success: true,
                data: postIdsArray
            }

        } catch (err) {
            err.from = 'PostModelG.selectPostsBasedOnCategory';
            next(err);
        }
    }

}


module.exports = PostModelG;