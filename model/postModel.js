class PostModel {
    async extractPostInformation(postIdArray) {
        try {
            let query = `
                SELECT 
                    p.id AS post_id,
                    p.title,
                    p.content,
                    p.image AS post_image,
                    p.category_slug,
                    u.user_id AS author_id,
                    u.username,
                    u.name,
                    u.profile_picture AS author_profile_picture
                FROM posts p
                INNER JOIN profile_info u ON p.user_id = u.user_id
                WHERE p.id = ANY($1);
            `

            let values = [postIdArray];

            let result = await pg.query(query, values);

            return {
                success: true,
                data: result.rows
            }

        } catch (err) {
            err.from = 'PostModel.extractPostInformation';
            next(err);
        }
    }

    async makePost({  id, categorySelected, postTitle, postContent , mimetype }) {
        try {
            let query = `
                    INSERT INTO posts (user_id, title, content, image , category)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id;
                `;

            let values = [id, postTitle, postContent, mimetype, categorySelected];

            let result = await pg.query(query , values);

            return (result.rowCount === 0) ? { success : false , reason : "Couldnt put in post"} : { success : true , data : result.rows[0]}

        } catch (err) {
            err.from = 'PostModel.makePost';
            next(err);
        }
    }

}


module.exports = PostModel;