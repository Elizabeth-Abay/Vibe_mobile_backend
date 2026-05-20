const PostModel = require('../model/postModel');
const PostModelG = require('../model/postModelG');



const postModel = new PostModel();
const postModelG = new PostModelG();


class PostService {
    async getPostsInACategory(categorySelected) {
        try {
            // get ids from the graph and content from postgres
            let result = await postModelG.selectPostsBasedOnCategory(categorySelected);

            if (result?.data.length === 0) return result;

            // else have the posts information be extracted from the postgres
            let { data } = result;


            let resultSent = await postModel.extractPostInformation(data);

            return resultSent;

        } catch (err) {
            err.from = 'PostService.getPostsInACategory';
            next(err);
        }
    }


    async createPost({
        id,
        categorySelected,
        postTitle,
        postContent,
        postImage
    }) {
        try {
            // putting the information in postgres table and link to graph
            let {}
            let query = `
                    INSERT INTO posts (user_id, title, content, image, category)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id;
                `;


        } catch (err) {
            err.from = 'PostService.createPost';
            next(err);
        }
    }
}